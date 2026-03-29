# DataQuest Adaptive Logic and Features (Full Code Walkthrough)

This document explains every adaptive and personalization feature implemented in this codebase, step by step, including scoring logic, path switching, guided timer behavior, accessibility, learning styles, and data tracking.

## 1. System Goal

DataQuest adapts learning along three dimensions:

1. Difficulty path adaptation (A, B, C).
2. Delivery adaptation (video/text order, in-module vs end-of-module assessment).
3. Interaction adaptation (question formats, hints, remediation, pacing checks, confidence capture).

Core path labels:

- Path A = Foundational
- Path B = Standard
- Path C = Advanced

## 2. End-to-End Adaptive Flow

## Step 0: Login and Session Bootstrap

On login/signup, the app loads or creates a student session and persisted preferences/progress.

Adaptive-relevant baseline state includes:

- learningPath (default B on signup)
- settings (mechanics, assessment style, content mode, timing, accessibility)
- moduleProgress
- pre/post test progress

## Step 1: Pre-Test (Diagnostic Mission)

The pre-test is the first adaptive gate.

What is captured per question:

- correctness
- confidence level: sure, maybe, guess

### 1.1 Confidence-weighted scoring

Each answer gets a weight based on correctness and confidence:

- Correct + sure = 1.00
- Correct + maybe = 0.75
- Correct + guess = 0.35
- Wrong + sure = 0.05
- Wrong + maybe = 0.12
- Wrong + guess = 0.20

This is used to compute mastery, not just raw accuracy.

### 1.2 Path and adaptive mode assignment from mastery

From mastery value m:

- Path assignment:
  - m < 0.45 -> Path A
  - 0.45 <= m < 0.75 -> Path B
  - m >= 0.75 -> Path C

- Adaptive mode assignment:
  - m <= 0.45 -> support
  - 0.45 < m < 0.82 -> standard
  - m >= 0.82 -> challenge

### 1.3 Module-specific skill diagnostics

Pre-test maps question IDs to module skills:

- 2.1: q_books_raj, q_pictograph_300, q_improvement_40, q_science_fraction, q_tally_7
- 2.2: q_interval_25
- 2.3: q_pie_chocolate
- 2.4: q_spinner_blue

For each module, it computes:

- module mastery
- module path
- module adaptive mode

Modules 2.5 and 2.6 inherit path/mode from overall mastery.

### 1.4 Learning style and mechanic recommendation

The system builds recommended game formats from weighted pre-test performance per format, then chooses top 3.

Fallback by mastery band:

- Support fallback (<=0.45): DragSort, TallyTap, BarBuilder
- Challenge fallback (>=0.82): SpinWheel, Hotspot, PieSlicer
- Otherwise: rank by weighted format performance

### 1.5 Three assessment styles (the "3 learning styles" in UI)

Styles in code:

- gamified
- traditional
- balanced

Auto-selection logic combines:

- pre-test recommended formats
- style priority list

Style priority lists:

- gamified: Raindrop, SpinWheel, PieSlicer, DragSort
- traditional: BarBuilder, TallyTap, Hotspot, DragSort
- balanced: DragSort, BarBuilder, Raindrop, TallyTap

### 1.6 Pre-test-driven personalization defaults

The app auto-sets:

- content mode:
  - mastery >= 0.60 -> text
  - mastery < 0.60 -> video

- assessment timing:
  - mastery >= 0.78 -> endOfModule
  - mastery < 0.78 -> inModule

- isStruggling flag:
  - overallMastery < 0.45 -> true

### 1.7 Pre-test persistence and retake behavior

Pre-test state is persisted continuously (question stage vs personalization stage, index, confidence, recommendations, preferences).

Retake mode preserves previous module history unless overwritten at final pre-test submission, and merges old/new module progress safely.

## Step 2: Dashboard Adaptation Surface

Dashboard exposes adaptive state and gating:

- modules locked until pre-test complete
- sequential unlock (module i unlocks only after module i-1 complete)
- dynamic current path shown from latest completed or next incomplete module path
- path timeline popup shows pre-test path + completed module paths
- recommended style card reflects pre-test recommendation
- post-test unlocks only after all modules complete

## Step 3: Module Runtime Adaptation

Modules are where continuous adaptation happens.

### 3.1 Which content path is loaded

Path resolution logic:

- reattempt mode uses current global session path
- review mode uses saved completedPathSnapshot
- otherwise uses moduleProgress.learningPath, then fallback to session path

Content source:

- getChapterDataForPath(path) loads one of:
  - Foundational module set
  - Standard module set
  - Advanced module set

### 3.2 Concept stage flow

Each concept has stages:

- content -> examples -> questions (or skip to questions in challenge contexts)

Progress bar uses stage weighting:

- content = 0.33
- examples = 0.66
- questions = 1.00

### 3.3 In-module vs end-of-module assessment timing

Based on settings.assessmentTime:

- inModule: questions in each concept block
- endOfModule: final aggregated module assessment at end

### 3.4 Guided practice with 10-second timer (explicit feature)

In concept examples stage, guided practice is required before progression:

- each guided item has a Start button
- start initializes a 10-second countdown
- answer is locked until countdown reaches 0
- learner can reveal/hide answer after unlock
- completion badge and progress count tracked
- skip-all flow exists with confirmation and telemetry logging

If skip-all is confirmed:

- concept can auto-advance to questions (if question stage exists), or
- complete concept directly (if no in-module questions)

### 3.5 Anti-rushing pacing check

For text-first content, the system blocks premature progression:

- expectedTime = max(10s, textLengthBasedEstimate)
- if actual/expected < 0.3, show "Hold on" review prompt

Learner must acknowledge review before continuing.

### 3.6 Question-level adaptation and constraints

Question rendering behavior:

- Pre-test: fixed authored format
- Module/Post contexts: can randomize to any enabled mechanic

Immediate-submit mechanics:

- Raindrop
- DragSort
- SpinWheel

Selection-then-submit mechanics:

- BarBuilder
- Hotspot
- PieSlicer
- TallyTap

### 3.6A Question adaptive variant logic (Q1 -> Q2)

Each topic now uses a base adaptive question and a routed follow-up variant.

Base ID naming rule:

- inline_[moduleId with . replaced by _]_[topicNumber]_0
- Example: module 2.1, topic 1 -> inline_2_1_1_0

After Q1 is finished, the runtime appends a suffix _x to select Q2:

| Q1 outcome bucket | Suffix x | Q2 ID example |
| --- | --- | --- |
| Correct, 0 hints, first try | 1 | inline_2_1_1_0_1 |
| Correct, 0 hints, second try (after one incorrect feedback cycle) | 2 | inline_2_1_1_0_2 |
| Correct, 1 hint, first try | 3 | inline_2_1_1_0_3 |
| Correct, 2 hints, first try | 4 | inline_2_1_1_0_4 |
| Correct, 2 hints, second try | 5 | inline_2_1_1_0_5 |
| Incorrect (forced advance) | 6 | inline_2_1_1_0_6 |

Implementation details used by runtime selector:

- The selector is computed in ConceptBlock using correctness + attempt count + hint level.
- Incorrect route uses suffix 6.
- Correct on second try with hints also routes to suffix 5 (so second-try + one hint is currently treated as bucket 5).
- Forced incorrect happens after MAX_INCORRECT_BEFORE_ADVANCE = 2 attempts.

### 3.6B Additional adaptive question-bank updates now in code

Recent content/system updates reflected in the course datasets:

- Every topic in modules 2.1 through 2.6 now loads a 7-question adaptive bundle (base + _1.._6).
- Path datasets (Foundational/Standard/Advanced) use buildAdaptiveQuestions(moduleNumber, topicNumber) for each topic.
- Variant bundles include per-question difficulty labels (easy/medium/hard) via ADAPTIVE_DIFFICULTY mapping.
- Question payloads now consistently carry:
  - hintLevel1 and hintLevel2
  - option-wise incorrectOptionFeedback
  - questionTags
  - remedialBrief/remedialDetail
  - structured remedialContent (core concept + step-by-step)
- Styles payloads are populated across all supported game formats so mechanics can be switched without losing correctness metadata.

### 3.7 Hint and remediation trigger logic

Constraint engine behavior per question:

- first wrong attempt:
  - show hint
  - increment hintsUsed metric

- second and later wrong attempts:
  - hide hint
  - show remediation block

Additional struggle signal:

- per-concept struggle key increments
- if 2+ concept struggle keys exist, session.isStruggling is set true

In ConceptBlock, question progression has additional guard:

- MAX_INCORRECT_BEFORE_ADVANCE = 2
- after 2 wrong attempts on same question, learner is forced to continue

### 3.8 Concept performance scoring (weighted formula)

At concept completion, a performance summary is computed:

- accuracy
- attempts
- hintsUsed
- remediationUsed
- timeSpentSec

Mastery formula:

mastery = 0.50*accuracy + 0.20*attemptsScore + 0.15*hintScore + 0.15*timeScore

Where:

- attemptsScore = clamp(2 - avgAttemptsPerQuestion, 0..1)
- hintScore = clamp(1 - hintsUsed/totalQuestions, 0..1)
- timeScore based on deviation from expected concept time

### 3.9 Dynamic path switching after each concept

After concept performance, next path/mode is decided.

Hard struggling override:

- mastery < 0.4 OR
- accuracy < 0.45 OR
- remediationUsed > 0 OR
- hintsUsed >= ceil(questionCount/2) OR
- attempts >= max(3, questionCount*2) OR
- timeSpent > 1.45x expected

Result:

- force nextPath = A
- adaptiveMode = support
- next stage = content
- isStruggling = true

Hard fast-mastery override:

- mastery >= 0.82 AND accuracy >= 0.85 AND
- hintsUsed = 0 AND remediationUsed = 0 AND
- attempts <= questionCount AND
- timeSpent <= 0.6x expected (with floor)

Result:

- force nextPath = C
- adaptiveMode = challenge
- next stage = questions
- isStruggling = false

Otherwise baseline from rolling mastery (last up to 3 concepts):

- baseline path:
  - rolling < 0.4 -> A
  - 0.4 <= rolling <= 0.75 -> B
  - rolling > 0.75 -> C

- adaptive mode:
  - rolling <= 0.45 -> support
  - rolling >= 0.82 -> challenge
  - else standard

Path updates are applied to:

- current module (if in progress)
- next module (if exists and not yet completed)
- global session path (except review-only flows)

### 3.10 Module completion adaptation state

At completion:

- confidence prompt captures low/med/high
- confidence is stored in moduleProgress
- completedPathSnapshot is stored (for review consistency)
- \_moduleAttempts and \_moduleReattempts counters increment
- +500 XP is awarded

Review mode:

- shows saved path snapshot
- shows concept-level attempts/hints/time/mastery
- allows question jump or full reattempt

## Step 4: Post-Test Adaptation and Progress Closure

Post-test is final evaluation and growth comparison.

Key behaviors:

- 10-minute timer
- auto-submit on timeout
- mark-for-review per question
- question navigator with answered/review states
- attempt history persisted (up to latest 20)
- learning gain = postTestScore - preTestScore

Progress persistence supports resume-in-progress and reattempt mode.

## 3. Personalization and Accessibility Controls

All are available in Settings and applied live.

## 3.1 Learning personalization controls

- assessment style: gamified/traditional/balanced
- enabled mechanics (must keep at least one)
- content order: video-first or text-first
- assessment timing: inModule or endOfModule

## 3.2 Accessibility controls

Menu options:

- highContrast
- dyslexia mode
- colorblind mode
- reducedMotion
- boldText
- underlineLinks
- sepia

Display controls:

- text size: small, medium, large, xLarge
- line spacing: normal, relaxed, wide
- theme color palette
- dark mode

App-level behavior:

- root CSS classes are toggled per accessibility mode
- CSS variables control font scale and line height

## 3.3 Audio/Video support

Video:

- every concept has videoUrl and optional checkpoint prompt
- supports YouTube embed, local MP4, or external iframe
- content mode can prioritize video or text

Audio:

- Sound FX preference flag is present in settings
- no direct audio playback engine is wired in question/concept components yet

## 4. Adaptive Content Architecture (A/B/C Content Differences)

Path-specific content is implemented through separate module datasets:

- src/data/Foundational/module_*.ts
- src/data/Standard/module_*.ts
- src/data/Advanced/module_*.ts

Differences include:

- narrative depth and wording complexity
- reading-time badges and pacing
- challenge framing in examples/prompts
- path tone labels in concept examples

The runtime also supports path-scoped concepts/questions via path fields, filtered at load time.

## 5. Data Tracked (Complete Inventory)

## 5.1 Session-level metrics (chapterMetrics)

Tracked in session store:

- startTime
- correctAnswers, wrongAnswers
- questionsAttempted (unique ids)
- questionAttemptCounts
- retryCount
- hintsUsed, totalHintsEmbedded
- activeTimeSpent, idleTimeSpent
- lastActivityTime
- optionMarkedCount, optionChangedCount
- remedialClicks
- settingsChanges

## 5.2 Pre-test diagnostic data

- correctness per question
- confidence per question
- weighted confidence score components
- preferred/recommended mechanics
- moduleSkillMastery
- recommendation summary string
- preTestProgress stage snapshot for resume

## 5.3 Module progression data

Per module:

- learningPath
- adaptiveMode
- masteryMap by concept
- attemptsCount and per-concept keys:
  - attempts
  - mastery percentage
  - hints per concept
  - time per concept
  - struggle markers
- currentConceptIdx/currentConceptStage
- final assessment pointers
- confidenceRating at completion
- completedPathSnapshot

## 5.4 Post-test data

- selectedOptions
- reviewFlags
- correctness array
- timer state
- autoSubmitted flag
- per-attempt history:
  - score
  - answeredCount
  - reviewMarkedCount
  - durationSeconds

## 5.5 Telemetry events (front-end buffer)

Event types include:

- session_start/session_end
- module_open/module_exit/module_complete
- stage_change
- question_view/question_attempt/question_correct/question_wrong
- option_marked/option_changed
- hint_opened/remedial_opened/remedial_expanded
- settings_changed/profile_updated/password_reset_requested/user_id_changed
- navigation
- clickstream/focus_change/heartbeat

Context captured with events:

- URL/referrer
- userAgent, language, timezone, platform
- screen and viewport
- inferred city/country
- device_id
- online status

## 5.6 Backend analytics aggregation

Server-side telemetry ingestion:

- accepts batched events
- enriches context with IP and geo lookup
- stores raw events in analytics_events
- updates per-student summary:
  - totalEvents
  - unique devices
  - unique IPs
  - unique cities/countries
  - lastActivityAt

Admin dashboard uses this for realtime monitoring, filtering, user drill-down, and CSV export.

## 5.7 Merge payload tracking

Session outcome payloads track:

- session status (completed/exited_midway)
- correct/wrong/attempted/total
- retry count
- hints used/available
- active time
- topic completion ratio

Validation enforces data sanity before submission and supports retry queues with exponential backoff.

## 6. How Tracked Data Is Used for Adaptation (Directly)

Data that directly changes learner experience now:

1. Pre-test correctness + confidence -> initial path/mode, mechanics recommendations, content mode, assessment timing.
2. In-module concept performance (accuracy, attempts, hints, remediation, time) -> dynamic path switch A/B/C and support/standard/challenge mode.
3. Question-level struggle indicators -> hint/remediation reveal and isStruggling escalation.
4. User settings -> immediate changes to mechanics, content order, timing, and accessibility rendering.

Data mainly used for analytics/monitoring (not direct runtime adaptation yet):

- clickstream/focus/heartbeat and most raw telemetry events
- admin aggregate summaries
- some advanced tracking fields typed but not actively populated (see gaps below)

## 7. Current Progress Representation (What "progress" means in code)

Progress is multi-layered:

1. Pre-test progress: current question, stage, confidence map, pending recommendations.
2. Module progress: current concept/stage, masteryMap, attempts/hints/time, completion status, saved path snapshot.
3. Dashboard progress: completed module count, path timeline, XP, recommendation label.
4. Post-test progress: timer state, selected responses, review marks, attempts history, learning gain.
5. Session status: in_progress, completed, exited_midway.

## 8. File-by-File Adaptive Map

Front-end adaptive core:

- src/pages/PreTest.tsx: diagnostic scoring, confidence weighting, initial adaptation setup.
- src/pages/ModulePage.tsx: runtime adaptation loop, path switching, module completion states.
- src/components/ConceptBlock.tsx: staged concept flow, guided timer, pacing guard, concept mastery scoring.
- src/hooks/useConstraintEngine.ts: hint/remediation escalation and struggle detection.
- src/components/GameQuestion.tsx: mechanic randomization and interaction telemetry.
- src/components/SettingsModal.tsx: personalization and accessibility controls.
- src/pages/Dashboard.tsx: adaptive progress visibility and module unlock flow.
- src/pages/PostTest.tsx: final timer/test flow, growth and attempt history.

Adaptive data and configuration:

- src/types/index.ts: session/progress/tracking schemas.
- src/store/sessionStore.ts: persisted state and metric updates.
- src/config/gameConfig.ts: path difficulty config and XP constants.
- src/data/Standard/pathData.ts: A/B/C module routing and skill-tag enrichment.
- src/data/Foundational/\*.ts, src/data/Standard/\*.ts, src/data/Advanced/\*.ts: path-specific authored content.
- src/data/questions/module_1.ts ... module_6.ts: adaptive question banks with base (_0) and variant (_1.._6) IDs per topic.
- src/data/questions/questionFactory.ts: generator utility for consistent adaptive question structure (hints, feedback, remedial content, tags, styles).
- src/data/Pre-Test/questions.ts, src/data/Post-Test/questions.ts: diagnostic and final assessment datasets.
- src/data/Standard/remedialContentBank.ts: remediation detail bank + content reference tags.

Tracking and integration:

- src/analytics/telemetry.ts: event buffering, clickstream, heartbeat, periodic flush.
- src/analytics/tracker.ts: local pre-test/internal analytics log.
- src/hooks/useMergeIntegration.ts: chapter session lifecycle, session metrics, merge submit/retry.
- src/integration/mergePayload.ts: payload shaping + validation wrapper.
- src/integration/payloadRetryManager.ts: retry queue and idempotency handling.

Backend analytics and persistence:

- src/backend/sessionRoutes.ts: profile sync, telemetry ingestion, admin analytics APIs, CSV export.
- src/backend/authRoutes.ts: auth/user-id + default learner initialization.
- src/lib/firebaseAuth.ts: frontend API client and cloud sync calls.

App-level application:

- src/App.tsx: tracking session setup, global telemetry flush loop, accessibility class application, cloud autosave.
- src/index.css: accessibility implementation via CSS classes/variables.

## 9. Known Gaps and In-Progress Hooks (Important)

These are present in code but not fully wired into active adaptation paths:

1. gameConfig difficulty fields (explanationLength, workedExamples, etc.) are defined and exposed via useAdaptivePath, but most are not actively used in rendering decisions.
2. moduleTracking schema exists, but moduleTracking is not currently populated by runtime code.
3. videoPlayCount/videoPauseCount/videoSeekCount/videoWatchTimeSec fields exist in type definitions but are not actively incremented.
4. soundEnabled/vfxEnabled are user preferences; direct audio/VFX behavior hooks are minimal.
5. ExitConfirmationModal + useMergeTeamIntegration flow exists but is separate from ModulePage's active exit modal path.
6. mergeTeamRoutes.ts exists with detailed endpoints, but server.ts currently mounts auth/session routes only.

## 10. Practical Summary

The adaptive engine is currently strongest in three places:

1. Pre-test confidence-weighted diagnostic initialization.
2. Concept-by-concept runtime path/mode switching using weighted performance telemetry.
3. Live personalization controls (style, mechanics, content order, timing, accessibility) that immediately alter learner experience.

The analytics layer is extensive and production-oriented, and it already captures enough signal to support even deeper adaptation loops in future iterations.
