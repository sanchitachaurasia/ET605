/**
 * MERGE TEAM INTEGRATION - Chapter Metadata API
 * Provides canonical chapter structure for Grade 8 Data Handling
 * 
 * Format: grade{number}_{chapter_name_snake_case}
 * Combines all 4 modules into 6 subtopics for Merge Team reporting
 */

export const chapterMetadataForMerge = {
  // CANONICAL CHAPTER DEFINITION
  grade: 8,
  chapter_name: "Data Handling",
  chapter_id: "grade8_data_handling",
  chapter_url: "/module/grade8/data-handling",
  chapter_difficulty: 0.55, // Medium difficulty: data org (easy) → probability (hard)
  expected_completion_time_seconds: 7200, // 2 hours
  
  // SUBTOPICS STRUCTURE
  subtopics: [
    // 1. Data Organisation & Types of Graphs
    {
      subtopic_id: "grade8_data_org_graphs",
      subtopic_name: "Data Organisation & Types of Graphs",
      subtopic_difficulty: 0.45,
      concepts: [
        { concept_id: "c8_data_org_1", concept_name: "Why Organise Data?", learning_outcomes: ["Explain the need for data organisation", "Distinguish raw vs organised data", "Describe challenges of raw data"], difficulty: 0.35 },
        { concept_id: "c8_data_org_2", concept_name: "Tally Marks & Frequency Tables", learning_outcomes: ["Create and interpret tally marks", "Build frequency tables", "Verify frequency totals"], difficulty: 0.40 },
        { concept_id: "c8_data_org_3", concept_name: "Pictographs", learning_outcomes: ["Read pictographs with keys", "Interpret half-symbols", "Explain pictograph scales"], difficulty: 0.40 },
        { concept_id: "c8_data_org_4", concept_name: "Bar Graphs", learning_outcomes: ["Draw and interpret bar graphs", "Label axes and scales", "Compare values using bars"], difficulty: 0.45 },
        { concept_id: "c8_data_org_5", concept_name: "Double Bar Graphs", learning_outcomes: ["Draw and interpret double bar graphs", "Use legends for group comparison", "Compare trends between groups"], difficulty: 0.45 },
        { concept_id: "c8_data_org_6", concept_name: "Interpreting Graphs & Data Detective", learning_outcomes: ["Interpret trends and peaks in graphs", "Draw conclusions from visual data", "Organise raw data for analysis"], difficulty: 0.45 }
      ]
    },
    // 2. Grouping Data & Histograms
    {
      subtopic_id: "grade8_histograms_grouping",
      subtopic_name: "Grouping Data & Histograms",
      subtopic_difficulty: 0.55,
      concepts: [
        { concept_id: "c8_hist_1", concept_name: "Class Intervals & Grouping", learning_outcomes: ["Explain class intervals", "Apply boundary rule", "Build grouped frequency tables"], difficulty: 0.50 },
        { concept_id: "c8_hist_2", concept_name: "What Is a Histogram?", learning_outcomes: ["Distinguish histograms from bar graphs", "Draw histograms for grouped data", "Interpret histogram shapes"], difficulty: 0.55 },
        { concept_id: "c8_hist_3", concept_name: "Choosing Bin Size", learning_outcomes: ["Calculate range and bin size", "Apply bin selection rules", "Compare bin size effects"], difficulty: 0.60 },
        { concept_id: "c8_hist_4", concept_name: "Histograms vs Bar Graphs", learning_outcomes: ["Compare categorical vs continuous data", "Identify when to use each graph", "Explain gaps vs touching bars"], difficulty: 0.55 },
        { concept_id: "c8_hist_5", concept_name: "Real Data Analysis Project", learning_outcomes: ["Conduct full data analysis", "Draw conclusions from grouped data", "Verify grouped data analysis"], difficulty: 0.60 },
        { concept_id: "c8_hist_6", concept_name: "Practice & Application", learning_outcomes: ["Apply histogram concepts to new datasets", "Interpret real-world grouped data", "Choose appropriate graph types"], difficulty: 0.55 }
      ]
    },
    // 3. Pie Charts & Circle Graphs
    {
      subtopic_id: "grade8_pie_charts",
      subtopic_name: "Pie Charts & Circle Graphs",
      subtopic_difficulty: 0.50,
      concepts: [
        { concept_id: "c8_pie_1", concept_name: "What Is a Pie Chart?", learning_outcomes: ["Explain pie chart structure", "Relate pie charts to real data", "Calculate sector angles"], difficulty: 0.45 },
        { concept_id: "c8_pie_2", concept_name: "Calculating Sector Angles", learning_outcomes: ["Convert percentages to degrees", "Verify angle calculations", "Sum angles to 360°"], difficulty: 0.50 },
        { concept_id: "c8_pie_3", concept_name: "Parts-of-Whole Representation", learning_outcomes: ["Interpret pie chart slices", "Match data types to pie charts", "Explain limitations of pie charts"], difficulty: 0.50 },
        { concept_id: "c8_pie_4", concept_name: "Real-World Pie Chart Analysis", learning_outcomes: ["Analyze published pie charts", "Detect misleading representations", "Create effective pie charts"], difficulty: 0.50 },
        { concept_id: "c8_pie_5", concept_name: "Comparing Pie Charts", learning_outcomes: ["Compare multiple pie charts", "Identify trends across charts", "Draw conclusions from comparisons"], difficulty: 0.50 },
        { concept_id: "c8_pie_6", concept_name: "Practice & Application", learning_outcomes: ["Apply pie chart concepts to new data", "Interpret real-world pie charts", "Choose alternatives for complex data"], difficulty: 0.50 }
      ]
    },
    // 4. Chance & Probability
    {
      subtopic_id: "grade8_probability_basics",
      subtopic_name: "Chance & Probability",
      subtopic_difficulty: 0.60,
      concepts: [
        { concept_id: "c8_prob_1", concept_name: "What Is Probability?", learning_outcomes: ["Define probability and its uses", "Calculate probability as a ratio", "Distinguish certain/impossible/possible events"], difficulty: 0.55 },
        { concept_id: "c8_prob_2", concept_name: "Equally Likely vs Not Equally Likely", learning_outcomes: ["Identify equally likely events", "Explain fairness in probability", "Apply to real-world scenarios"], difficulty: 0.60 },
        { concept_id: "c8_prob_3", concept_name: "Probability in Games", learning_outcomes: ["Apply probability to games", "Calculate expected values", "Understand odds in simple games"], difficulty: 0.60 },
        { concept_id: "c8_prob_4", concept_name: "Experimental vs Theoretical Probability", learning_outcomes: ["Compare experimental and theoretical probability", "Understand Law of Large Numbers", "Detect loaded dice/coins"], difficulty: 0.60 },
        { concept_id: "c8_prob_5", concept_name: "Probability in Real Life", learning_outcomes: ["Use probability in daily decisions", "Relate probability to trends/statistics", "Connect to business/inventory"], difficulty: 0.60 },
        { concept_id: "c8_prob_6", concept_name: "Practice & Application", learning_outcomes: ["Apply probability concepts to new problems", "Interpret probability in real-world data", "Design simple probability experiments"], difficulty: 0.60 }
      ]
    },
    // 5. Applying Probability to Life
    {
      subtopic_id: "grade8_probability_applied",
      subtopic_name: "Applying Probability to Life",
      subtopic_difficulty: 0.65,
      concepts: [
        { concept_id: "c8_prob_app_1", concept_name: "The Raincoat Dilemma", learning_outcomes: ["Use probability for predictions", "Relate probability to business decisions", "Connect probability to trends"], difficulty: 0.60 },
        { concept_id: "c8_prob_app_2", concept_name: "Probability in Business", learning_outcomes: ["Explain probability in business planning", "Define inventory", "Apply probability to inventory scenarios"], difficulty: 0.65 },
        { concept_id: "c8_prob_app_3", concept_name: "Sports & Statistics", learning_outcomes: ["Interpret sports statistics", "Apply probability to sports", "Understand averages/trends in sports"], difficulty: 0.60 },
        { concept_id: "c8_prob_app_4", concept_name: "Probability in Weather & Science", learning_outcomes: ["Apply probability to weather predictions", "Interpret probability in science data", "Connect probability to real-world science"], difficulty: 0.60 },
        { concept_id: "c8_prob_app_5", concept_name: "Probability in Social Contexts", learning_outcomes: ["Use probability in social decisions", "Interpret probability in surveys", "Apply probability to group outcomes"], difficulty: 0.60 },
        { concept_id: "c8_prob_app_6", concept_name: "Practice & Application", learning_outcomes: ["Apply probability to new life scenarios", "Design probability-based activities", "Interpret probability in news/media"], difficulty: 0.60 }
      ]
    },
    // 6. Master Revision - Data Handling
    {
      subtopic_id: "grade8_revision",
      subtopic_name: "Master Revision - Data Handling",
      subtopic_difficulty: 0.50,
      concepts: [
        { concept_id: "c8_rev_1", concept_name: "Warm-Up Recall", learning_outcomes: ["Recall key facts and definitions", "Answer rapid-fire recall questions", "Review core concepts"], difficulty: 0.40 },
        { concept_id: "c8_rev_2", concept_name: "Active Recall", learning_outcomes: ["Recall and explain graph differences", "Apply boundary rule for intervals", "Convert percentages to angles"], difficulty: 0.45 },
        { concept_id: "c8_rev_3", concept_name: "Mixed Practice", learning_outcomes: ["Solve mixed data handling problems", "Interpret multiple graph types", "Apply concepts in combination"], difficulty: 0.45 },
        { concept_id: "c8_rev_4", concept_name: "Challenge Questions", learning_outcomes: ["Tackle advanced/challenge problems", "Explain reasoning for solutions", "Connect multiple concepts"], difficulty: 0.50 },
        { concept_id: "c8_rev_5", concept_name: "Peer Review & Discussion", learning_outcomes: ["Review peer solutions", "Discuss alternative approaches", "Reflect on learning"], difficulty: 0.45 },
        { concept_id: "c8_rev_6", concept_name: "Final Assessment & Reflection", learning_outcomes: ["Complete a final assessment", "Reflect on strengths and areas to improve", "Set goals for future learning"], difficulty: 0.45 }
      ]
    }
  ],

  prerequisites: ["grade7_data_handling"],
  
  // MERGE TEAM INTEGRATION METADATA
  tracking_config: {
    captures_student_id: true,
    generates_unique_session_id: true,
    session_id_format: "s_{student_id}_{chapter_id}_{timestamp}",
    timestamp_format: "UTC ISO 8601",
    session_status_options: ["completed", "exited_midway"],
    exit_confirmation_required: true,
    retry_on_network_failure: true,
    max_retry_attempts: 3,
    duplicate_submission_handling: "safe_resend_with_same_session_id"
  }
};

/**
 * Summary for Merge Team:
 * - Grade 8 (approx. 11-13 year olds)
 * - 6 subtopics covering 20 concepts total
 * - Difficulty progression: 0.35 (easy) → 0.65 (hard)
 * - Estimated completion: 2 hours (7200 seconds)
 * - Full session tracking with metrics
 */
