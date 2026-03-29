// API route to serve canonical chapter metadata for Merge Team integration
import { chapterMetadataForMerge } from '../../src/backend/mergeTeamMetadata';

export default function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Transform subtopics to required format (flatten subtopic fields)
  const subtopics = chapterMetadataForMerge.subtopics.map(sub => ({
    subtopic_id: sub.subtopic_id,
    name: sub.subtopic_name,
    difficulty: sub.subtopic_difficulty
  }));

  // Compose response in Merge Team format
  const response = {
    grade: chapterMetadataForMerge.grade,
    chapter_name: chapterMetadataForMerge.chapter_name,
    chapter_id: chapterMetadataForMerge.chapter_id,
    chapter_url: chapterMetadataForMerge.chapter_url,
    chapter_difficulty: chapterMetadataForMerge.chapter_difficulty,
    expected_completion_time_seconds: chapterMetadataForMerge.expected_completion_time_seconds,
    subtopics,
    prerequisites: chapterMetadataForMerge.prerequisites
  };

  res.status(200).json(response);
}
