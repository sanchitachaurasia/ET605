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
  chapter_name: "Data Handling & Probability",
  chapter_id: "grade8_data_handling_probability",
  chapter_url: "/module/grade8/data-handling",
  chapter_difficulty: 0.55, // Medium difficulty: data org (easy) → probability (hard)
  expected_completion_time_seconds: 7200, // 2 hours
  
  // SUBTOPICS STRUCTURE (6 subtopics × 3-4 concepts each = ~20 concepts total)
  subtopics: [
    {
      subtopic_id: "grade8_data_org_graphs",
      subtopic_name: "Data Organisation & Graphs",
      subtopic_difficulty: 0.45, // Easy-Medium
      concepts: [
        {
          concept_id: "c8_data_org_1",
          concept_name: "Why Organise Data?",
          learning_outcomes: [
            "Understand why data organisation matters",
            "Distinguish between raw and organized data",
            "Recognize patterns in organized vs unorganized data"
          ],
          difficulty: 0.35
        },
        {
          concept_id: "c8_data_org_2",
          concept_name: "Tally Marks & Frequency Tables",
          learning_outcomes: [
            "Create tally marks correctly",
            "Build frequency tables",
            "Interpret frequency data"
          ],
          difficulty: 0.40
        },
        {
          concept_id: "c8_data_org_3",
          concept_name: "Pictographs",
          learning_outcomes: [
            "Read pictographs with scales",
            "Understand symbol-to-value mapping",
            "Handle fractional symbols"
          ],
          difficulty: 0.40
        },
        {
          concept_id: "c8_data_org_4",
          concept_name: "Bar Graphs & Comparison",
          learning_outcomes: [
            "Create and read bar graphs",
            "Compare categories using bars",
            "Distinguish bar graphs from histograms"
          ],
          difficulty: 0.45
        }
      ]
    },
    {
      subtopic_id: "grade8_graph_interpretation",
      subtopic_name: "Graph Interpretation & Analysis",
      subtopic_difficulty: 0.50, // Medium
      concepts: [
        {
          concept_id: "c8_graph_read_1",
          concept_name: "Reading & Interpreting Real Graphs",
          learning_outcomes: [
            "Identify scale manipulations in graphs",
            "Detect broken axes",
            "Spot 3D distortions",
            "Criticize misleading presentations"
          ],
          difficulty: 0.50
        },
        {
          concept_id: "c8_graph_read_2",
          concept_name: "Class Data Collection Project",
          learning_outcomes: [
            "Design surveys",
            "Collect real data",
            "Choose appropriate graph types",
            "Present findings"
          ],
          difficulty: 0.55
        },
        {
          concept_id: "c8_graph_read_3",
          concept_name: "Choosing the Right Graph",
          learning_outcomes: [
            "Match data type to graph form",
            "Evaluate graph effectiveness",
            "Understand when each graph fails"
          ],
          difficulty: 0.45
        }
      ]
    },
    {
      subtopic_id: "grade8_histograms_grouping",
      subtopic_name: "Grouping Data & Histograms",
      subtopic_difficulty: 0.55, // Medium
      concepts: [
        {
          concept_id: "c8_hist_1",
          concept_name: "Class Intervals & Range",
          learning_outcomes: [
            "Calculate data range",
            "Create class intervals",
            "Choose appropriate bin widths"
          ],
          difficulty: 0.50
        },
        {
          concept_id: "c8_hist_2",
          concept_name: "What Is a Histogram?",
          learning_outcomes: [
            "Understand histogram structure",
            "Read continuous data representations",
            "Know when to use histograms vs bar graphs"
          ],
          difficulty: 0.55
        },
        {
          concept_id: "c8_hist_3",
          concept_name: "Choosing Bin Size",
          learning_outcomes: [
            "Apply √n rule",
            "Use Sturges' formula",
            "Evaluate bin size choices"
          ],
          difficulty: 0.60
        },
        {
          concept_id: "c8_hist_4",
          concept_name: "Real Data Analysis Project",
          learning_outcomes: [
            "Organize continuous data",
            "Create appropriate histograms",
            "Identify distribution patterns"
          ],
          difficulty: 0.55
        }
      ]
    },
    {
      subtopic_id: "grade8_pie_charts",
      subtopic_name: "Pie Charts & Proportional Representation",
      subtopic_difficulty: 0.50, // Medium
      concepts: [
        {
          concept_id: "c8_pie_1",
          concept_name: "What Is a Pie Chart?",
          learning_outcomes: [
            "Understand parts-of-whole representation",
            "Read pie chart slices",
            "Know when pie charts are useful"
          ],
          difficulty: 0.45
        },
        {
          concept_id: "c8_pie_2",
          concept_name: "Calculating Sector Angles",
          learning_outcomes: [
            "Calculate percentages from data",
            "Convert percentages to degrees",
            "Verify angle calculations (360° total)"
          ],
          difficulty: 0.55
        },
        {
          concept_id: "c8_pie_3",
          concept_name: "When to Use Pie Charts",
          learning_outcomes: [
            "Match data types to pie charts",
            "Understand limitations (max 5-6 slices)",
            "Choose alternatives for complex data"
          ],
          difficulty: 0.50
        },
        {
          concept_id: "c8_pie_4",
          concept_name: "Real-World Pie Chart Analysis",
          learning_outcomes: [
            "Analyze published pie charts",
            "Detect misleading pie representations",
            "Create effective pie charts from data"
          ],
          difficulty: 0.50
        }
      ]
    },
    {
      subtopic_id: "grade8_probability_basics",
      subtopic_name: "Probability Foundations",
      subtopic_difficulty: 0.60, // Medium-Hard
      concepts: [
        {
          concept_id: "c8_prob_1",
          concept_name: "Basic Probability Concepts",
          learning_outcomes: [
            "Calculate probability ratios",
            "Understand probability range (0-1)",
            "Distinguish favorable from total outcomes"
          ],
          difficulty: 0.55
        },
        {
          concept_id: "c8_prob_2",
          concept_name: "Equally Likely vs Non-Equally Likely",
          learning_outcomes: [
            "Identify fair probability distributions",
            "Detect rigged or biased games",
            "Evaluate game fairness"
          ],
          difficulty: 0.60
        },
        {
          concept_id: "c8_prob_3",
          concept_name: "Experimental vs Theoretical",
          learning_outcomes: [
            "Understand Law of Large Numbers",
            "Compare experimental to theoretical probability",
            "Use data to detect loaded dice/coins"
          ],
          difficulty: 0.65
        },
        {
          concept_id: "c8_prob_4",
          concept_name: "Probability in Real Life",
          learning_outcomes: [
            "Apply probability to games",
            "Calculate expected values",
            "Understand carnival game odds"
          ],
          difficulty: 0.60
        }
      ]
    },
    {
      subtopic_id: "grade8_probability_advanced",
      subtopic_name: "Advanced Probability & Logic",
      subtopic_difficulty: 0.65, // Hard
      concepts: [
        {
          concept_id: "c8_adv_prob_1",
          concept_name: "Independent Events",
          learning_outcomes: [
            "Recognize independent events",
            "Calculate compound probabilities",
            "Understand multiplication rule"
          ],
          difficulty: 0.60
        },
        {
          concept_id: "c8_adv_prob_2",
          concept_name: "Dependent Events",
          learning_outcomes: [
            "Understand conditional probability",
            "Calculate dependent event probabilities",
            "Apply without-replacement scenarios"
          ],
          difficulty: 0.65
        },
        {
          concept_id: "c8_adv_prob_3",
          concept_name: "Probability in Sports & Games",
          learning_outcomes: [
            "Apply probability to real sports scenarios",
            "Understand betting odds",
            "Evaluate sports statistics"
          ],
          difficulty: 0.60
        }
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
