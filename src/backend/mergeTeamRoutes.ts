/**
 * MERGE TEAM API ROUTES
 * Express endpoints for:
 * 1. /api/merge/chapter-metadata - Serve canonical chapter structure
 * 2. /api/merge/session-submit - Send session payload at completion/exit
 * 3. Retry logic for network failures
 */

import { Router, Request, Response } from 'express';
import { db } from './firebase';
import { chapterMetadataForMerge } from './mergeTeamMetadata';
import {
  MergeTeamSessionPayload,
  MergeTeamPayloadValidator,
  exampleValidPayload
} from './mergeTeamPayload';

const mergeRouter = Router();

// ============================================================================
// ENDPOINT 1: Serve Chapter Metadata (required by Merge Team)
// ============================================================================
mergeRouter.get('/api/merge/chapter-metadata', (req: Request, res: Response) => {
  /**
   * GET /api/merge/chapter-metadata
   * 
   * Returns the canonical chapter structure for Grade 8 Data Handling
   * This is served ONCE per chapter version, then cached by Merge Team.
   * 
   * Response: chapterMetadataForMerge object with all subtopics and concepts
   */
  try {
    console.log('[Merge] Serving chapter metadata for grade8_data_handling_probability');
    res.status(200).json({
      success: true,
      data: chapterMetadataForMerge,
      served_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Merge] Error serving metadata:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to serve chapter metadata'
    });
  }
});

// ============================================================================
// ENDPOINT 2: Submit Session Payload (called at chapter completion or exit)
// ============================================================================
mergeRouter.post('/api/merge/session-submit', async (req: Request, res: Response) => {
  /**
   * POST /api/merge/session-submit
   * 
   * Receives session payload from frontend, validates it, then forwards to Merge Team.
   * Safe to resend with same session_id (idempotent).
   * 
   * Request body: MergeTeamSessionPayload
   * 
   * Responses:
   * - 201 Created: Payload received and forwarded successfully
   * - 400 Bad Request: Validation failed, check errors
   * - 500 Server Error: Network/database issue during forwarding
   */

  try {
    const payload: Partial<MergeTeamSessionPayload> = req.body;

    // Step 1: Validate payload
    const validation = MergeTeamPayloadValidator.validate(payload);
    if (!validation.valid) {
      console.warn('[Merge] Validation failed:', validation.errors);
      return res.status(400).json({
        success: false,
        error: 'Invalid session payload',
        validation_errors: validation.errors
      });
    }

    const validPayload = payload as MergeTeamSessionPayload;

    console.log(`[Merge] Received session from ${validPayload.student_id}, session: ${validPayload.session_id}`);

    // Step 2: Store payload locally (for audit trail and replay)
    const docRef = db.collection('merge_submissions').doc(validPayload.session_id);
    await docRef.set({
      ...validPayload,
      received_at: new Date().toISOString(),
      forwarded_to_merge_team: false,
      retry_count: 0,
      status: 'pending_forward'
    });

    // Step 3: Forward to Merge Team endpoint
    // TODO: Replace with actual Merge Team endpoint
    const MERGE_TEAM_ENDPOINT = process.env.MERGE_TEAM_ENDPOINT ||
      'https://merge-api.example.com/v1/sessions';
    const MERGE_TEAM_API_KEY = process.env.MERGE_TEAM_API_KEY;

    try {
      const forwardResponse = await fetch(MERGE_TEAM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MERGE_TEAM_API_KEY}`
        },
        body: JSON.stringify(validPayload)
      });

      if (!forwardResponse.ok) {
        throw new Error(`Merge Team returned ${forwardResponse.status}`);
      }

      const mergeResponse = await forwardResponse.json();

      // Mark as successfully forwarded
      await docRef.update({
        forwarded_to_merge_team: true,
        forwarded_at: new Date().toISOString(),
        merge_team_response: mergeResponse,
        status: 'forwarded'
      });

      console.log(`[Merge] Successfully forwarded session ${validPayload.session_id}`);

      res.status(201).json({
        success: true,
        message: 'Session payload received and forwarded to Merge Team',
        session_id: validPayload.session_id,
        merge_team_receipt: mergeResponse
      });
    } catch (forwardError) {
      console.error('[Merge] Failed to forward to Merge Team:', forwardError);

      // Store error for retry mechanism
      await docRef.update({
        forward_error: String(forwardError),
        retry_count: (0 + 1),
        status: 'forward_failed',
        next_retry_at: new Date(Date.now() + 1000 * (2 ** 0)) // Exponential backoff
      });

      // Return success to frontend (received), but note forwarding issue
      res.status(201).json({
        success: true,
        message: 'Session stored locally. Forwarding to Merge Team failed; will retry.',
        session_id: validPayload.session_id,
        forwarding_status: 'pending_retry'
      });
    }
  } catch (error) {
    console.error('[Merge] Unexpected error:', error);
    res.status(500).json({
      success: false,
      error: 'Unexpected error processing session payload'
    });
  }
});

// ============================================================================
// ENDPOINT 3: Retry Failed Submissions (for Merge Team sync)
// ============================================================================
mergeRouter.post('/api/merge/retry-failed', async (req: Request, res: Response) => {
  /**
   * POST /api/merge/retry-failed
   * 
   * Internal endpoint to retry failed Merge Team submissions.
   * Triggered by scheduled jobs or admin action.
   * Implements exponential backoff: 1s → 2s → 4s → stop at 3 retries
   */

  try {
    const snapshot = await db
      .collection('merge_submissions')
      .where('status', '==', 'forward_failed')
      .where('retry_count', '<', 3)
      .get();

    let retried = 0;
    const results: any[] = [];

    for (const doc of snapshot.docs) {
      const submission = doc.data() as any;
      const backoffMultiplier = Math.pow(2, submission.retry_count); // 1, 2, 4
      const nextRetryTime = new Date(
        new Date(submission.next_retry_at).getTime() +
        1000 * backoffMultiplier
      );

      if (new Date() >= nextRetryTime && submission.retry_count < 3) {
        // Attempt retry
        const MERGE_TEAM_ENDPOINT = process.env.MERGE_TEAM_ENDPOINT ||
          'https://merge-api.example.com/v1/sessions';
        const MERGE_TEAM_API_KEY = process.env.MERGE_TEAM_API_KEY;

        try {
          const payload: MergeTeamSessionPayload = {
            student_id: submission.student_id,
            session_id: submission.session_id,
            chapter_id: submission.chapter_id,
            timestamp: submission.timestamp,
            session_status: submission.session_status,
            correct_answers: submission.correct_answers,
            wrong_answers: submission.wrong_answers,
            questions_attempted: submission.questions_attempted,
            total_questions: submission.total_questions,
            retry_count: submission.retry_count,
            hints_used: submission.hints_used,
            total_hints_embedded: submission.total_hints_embedded,
            time_spent_seconds: submission.time_spent_seconds,
            topic_completion_ratio: submission.topic_completion_ratio
          };

          const forwardResponse = await fetch(MERGE_TEAM_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${MERGE_TEAM_API_KEY}`
            },
            body: JSON.stringify(payload)
          });

          if (forwardResponse.ok) {
            const mergeResponse = await forwardResponse.json();
            await doc.ref.update({
              forwarded_to_merge_team: true,
              forwarded_at: new Date().toISOString(),
              merge_team_response: mergeResponse,
              status: 'forwarded'
            });
            retried++;

            results.push({
              session_id: submission.session_id,
              status: 'succeeded',
              attempt: submission.retry_count + 1
            });
          } else {
            throw new Error(`HTTP ${forwardResponse.status}`);
          }
        } catch (error) {
          await doc.ref.update({
            retry_count: submission.retry_count + 1,
            forward_error: String(error),
            next_retry_at: new Date(
              Date.now() + 1000 * Math.pow(2, submission.retry_count + 1)
            ),
            status: submission.retry_count + 1 >= 3 ? 'failed_final' : 'forward_failed'
          });

          results.push({
            session_id: submission.session_id,
            status: 'failed',
            attempt: submission.retry_count + 1,
            error: String(error)
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      retried_count: retried,
      details: results
    });
  } catch (error) {
    console.error('[Merge] Retry error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process retries'
    });
  }
});

// ============================================================================
// ENDPOINT 4: Health Check (for Merge Team validation)
// ============================================================================
mergeRouter.get('/api/merge/health', (req: Request, res: Response) => {
  /**
   * GET /api/merge/health
   * 
   * Simple health check endpoint for Merge Team to verify integration is live.
   */
  res.status(200).json({
    success: true,
    status: 'healthy',
    chapter_id: 'grade8_data_handling_probability',
    integration: 'merge_team_v1',
    timestamp: new Date().toISOString()
  });
});

export default mergeRouter;

/**
 * INTEGRATION CHECKLIST (for Merge Team)
 * 
 * ✓ Expose Chapter Metadata API (/api/merge/chapter-metadata)
 * ✓ Track student interaction metrics (stored in sessionStore)
 * ✓ Send session payload at chapter completion (/api/merge/session-submit)
 * ✓ Use exact field names, data types, ID formats
 * ✓ Implement retry logic with exponential backoff
 * ✓ Handle missing values as null (not fabricated)
 * ✓ Validate all payloads before sending
 * ✓ Safe resend with same session_id for duplicate protection
 * ✓ Do not calculate performance score (Merge Team responsibility)
 * ✓ Store submissions locally for audit trail
 */
