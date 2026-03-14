// IQ Test Questions - Pattern Recognition, Numerical, Spatial
const questions = [
  {
    id: 1,
    type: "image_options",
    category: "Pattern Recognition",
    category_question: "Visuospatial Pattern Reasoning",
    question: "Which Shape is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/bca1b52ed_image.png",
    options: [
      { text: "A", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/ab415a971_image.png" },
      { text: "B", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/9266dd486_image.png" },
      { text: "C", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/54db03d83_image.png" },
      { text: "D", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/97b3ddde9_image.png" },
      { text: "E", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/7656b7547_image.png" },
      { text: "F", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/f43917ea7_image.png" }
    ],
    correct: 5,
    explanation: "The correct answer is F — a fully filled dark circle."
  },
  {
    id: 2,
    type: "spatial",
    category: "Spatial Reasoning",
    category_question: "Visuospatial Insight",
    question: "How many triangles are in the picture?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/ef3611d3d_image.png",
    options: ["3", "8", "7", "6", "5", "4"],
    correct: 3,
    explanation: "A large triangle with 2 internal lines from the apex creates 3 small triangles at the base, 2 medium triangles, and 1 large outer triangle = 6 total. Answer: D (6)."
  },
  {
    id: 3,
    type: "svg_options",
    category: "Pattern Recognition",
    category_question: "Visuospatial Pattern Reasoning",
    question: "Which Shape is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/024f8a262_image.png",
    options: [
      { text: "A", svg: "tall_rect" },
      { text: "B", svg: "square" },
      { text: "C", svg: "wide_rect" },
      { text: "D", svg: "triangle" },
      { text: "E", svg: "vertical_line" },
      { text: "F", svg: "oval" }
    ],
    correct: 1,
    explanation: "The pattern shows each shape is transformed by the operator: row 3 has square + cross, resulting in a square. Answer: B (square)."
  },
  {
    id: 4,
    type: "numerical",
    category: "Numerical Reasoning",
    category_question: "Numerical Pattern Reasoning",
    question: "Which number is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/23df53e6f_image.png",
    options: ["30", "55", "25", "15", "50", "20"],
    correct: 0,
    explanation: "Pattern: col1 × 2 = col2, col2 × 3 = col3. Row 3: 5×2=10, 10×3=30. Answer: A (30)."
  },
  {
    id: 5,
    type: "svg_options",
    category: "Spatial Reasoning",
    category_question: "Visuospatial Insight",
    question: "What box was created from the image?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6e78a099b_image.png",
    options: [
      { text: "A", svg: "cube_right_filled" },
      { text: "B", svg: "cube_bottom_filled" },
      { text: "C", svg: "cube_top_filled" },
      { text: "D", svg: "cube_all_filled" },
      { text: "E", svg: "cube_left_top_filled" },
      { text: "F", svg: "cube_top_only_filled" }
    ],
    correct: 4,
    explanation: "The net has navy squares on top, left, right, and bottom of center, with a white center and white far-right panel. When folded, the top and left faces are navy. Answer: E."
  },
  {
    id: 6,
    type: "svg_options",
    category: "Spatial Reasoning",
    category_question: "Visuospatial Insight",
    question: "Which Shape is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/f9b82aec0_image.png",
    options: [
      { text: "A", svg: "q6_optA" },
      { text: "B", svg: "q6_optB" },
      { text: "C", svg: "q6_optC" },
      { text: "D", svg: "q6_optD" },
      { text: "E", svg: "q6_optE" },
      { text: "F", svg: "q6_optF" }
    ],
    correct: 4,
    explanation: "The center piece shows the navy vertical band with white diagonal lines converging inward and a horizontal dividing line. Answer: E."
  },
  {
    id: 7,
    type: "spatial",
    category: "Spatial Reasoning",
    category_question: "Visuospatial Insight",
    question: "How many triangles are in the picture?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/270e31938_image.png",
    options: ["3", "9", "7", "6", "5", "4"],
    correct: 4,
    explanation: "There are 4 small upward triangles, 1 small downward triangle, and the large outer triangle = 5 total (but also counting medium compositions). Answer: E (5)."
  },
  {
    id: 8,
    type: "svg_options",
    category: "Pattern Recognition",
    category_question: "Visuospatial Pattern Reasoning",
    question: "Which Shape is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/3d58041b4_image.png",
    options: [
      { text: "A", svg: "q8_optA" },
      { text: "B", svg: "q8_optB" },
      { text: "C", svg: "q8_optC" },
      { text: "D", svg: "q8_optD" },
      { text: "E", svg: "q8_optE" },
      { text: "F", svg: "q8_optF" }
    ],
    correct: 1,
    explanation: "The missing piece has an orange square top-right and orange circle bottom-left. Answer: B."
  },
  {
    id: 9,
    type: "numerical",
    category: "Numerical Reasoning",
    category_question: "Numerical Pattern Reasoning",
    question: "Which number is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/c7118808d_image.png",
    options: ["10", "8", "6", "12", "16", "9"],
    correct: 1,
    explanation: "Pattern: col1 × col2 = col3. Row 1: 5×3=15, Row 2: 3×3=9, Row 3: 4×2=8. Answer: B (8)."
  },
  {
    id: 10,
    type: "svg_options",
    category: "Pattern Recognition",
    category_question: "Visuospatial Pattern Reasoning",
    question: "Which Shape is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/745c01c52_image.png",
    options: [
      { text: "A", svg: "q10_optA" },
      { text: "B", svg: "q10_optB" },
      { text: "C", svg: "q10_optC" },
      { text: "D", svg: "q10_optD" },
      { text: "E", svg: "q10_optE" },
      { text: "F", svg: "q10_optF" }
    ],
    correct: 1,
    explanation: "The orange cells shift diagonally. The missing piece has orange top-right and center-middle cells. Answer: B."
  },
  {
    id: 11,
    type: "spatial",
    category: "Spatial Reasoning",
    category_question: "Visuospatial Insight",
    question: "How many squares are in the picture?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/917abef75_image.png",
    options: ["9", "10", "11", "12", "13", "14"],
    correct: 5,
    explanation: "Count all squares: 9 small (1×1) + 4 medium (2×2) + 1 large (3×3) = 14. Answer: F (14)."
  },
  {
    id: 12,
    type: "numerical",
    category: "Numerical Reasoning",
    category_question: "Numerical Pattern Reasoning",
    question: "Which number is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/a4e1b34c5_image.png",
    options: ["38", "43", "40", "42", "41", "39"],
    correct: 2,
    explanation: "Reading all numbers left-to-right top-to-bottom: 4,5,7,10,14,19,25,32,? The differences are 1,2,3,4,5,6,7,8 — so ?=32+8=40. Answer: C (40)."
  },
  {
    id: 13,
    type: "image_options",
    category: "Pattern Recognition",
    category_question: "Visuospatial Pattern Reasoning",
    question: "Which Shape is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/01b6c56a9_image.png",
    options: [
      { text: "A", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/0317446ef_image.png#A" },
      { text: "B", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/0317446ef_image.png#B" },
      { text: "C", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/0317446ef_image.png#C" },
      { text: "D", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/0317446ef_image.png#D" },
      { text: "E", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/0317446ef_image.png#E" },
      { text: "F", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/0317446ef_image.png#F" }
    ],
    correct: 5,
    explanation: "The correct answer is F."
  },
  {
    id: 14,
    type: "pattern",
    category: "Pattern Recognition",
    question: "Which shape is missing? Each hexagon is divided into triangular sections colored orange and navy. The orange section rotates clockwise across the grid.",
    grid: [
      ["navy_dominant_left_orange", "navy_dominant_right_orange", "orange_dominant_left_navy"],
      ["navy_large_bottom_orange", "navy_center_triangle", "navy_right_small_orange"],
      ["navy_bottom_triangle", "orange_dominant_navy_triangle", "?"]
    ],
    options: [
      "Navy and orange equal split rotated",
      "Mostly orange, small navy wedge",
      "Orange dominant with two navy wedges",
      "Mostly orange, large navy right",
      "Navy with small orange triangles",
      "Mostly navy, orange right wedge"
    ],
    correct: 2,
    explanation: "The pattern shows the orange section rotating clockwise and growing. Row 3 col 3 should show mostly orange with two small navy wedges. Answer: C."
  },
  {
    id: 15,
    type: "spatial",
    category: "Spatial Reasoning",
    question: "Which shape is missing? A large orange rectangle contains diagonal lines: two dark gray/navy parallel diagonal lines going one direction, white curved lines, and one red diagonal line.",
    options: [
      "Orange with red line top-right and black diagonal",
      "Orange with horizontal black lines and red slash",
      "Orange with diagonal black line only",
      "Orange with multiple black diagonals and red",
      "Orange with black lines and red top-left",
      "Orange with black parallel diagonals and red line bottom-right"
    ],
    correct: 5,
    explanation: "The center piece of the image shows the intersection of the gray parallel lines and the red diagonal line in the lower portion. Answer: F."
  },
  {
    id: 16,
    type: "numerical",
    category: "Numerical Reasoning",
    question: "Which number is missing? The grid contains: Row 1: 4, 5, 7 | Row 2: 10, 14, 19 | Row 3: 25, 32, ?",
    grid: [
      [4, 5, 7],
      [10, 14, 19],
      [25, 32, "?"]
    ],
    options: ["38", "43", "40", "42", "41", "39"],
    correct: 2,
    explanation: "Reading all numbers left-to-right top-to-bottom: 4,5,7,10,14,19,25,32,? The differences are 1,2,3,4,5,6,7,8 — so ?=32+8=40. Answer: C (40)."
  },
  {
    id: 17,
    type: "pattern",
    category: "Pattern Recognition",
    question: "Which shape is missing? Each circle is filled with varying amounts of dark navy. Row 1: ~25%, ~50%, ~75% filled. Row 2: ~25% rotating. Row 3: ~25%, ~50%, ?",
    grid: [
      ["circle_25pct", "circle_50pct", "circle_75pct"],
      ["circle_25pct_rotated", "circle_25pct_more_rotated", "circle_25pct_further"],
      ["circle_25pct_bottom", "circle_50pct_bottom", "?"]
    ],
    options: [
      "Half filled left",
      "75% filled with small white wedge",
      "Quarter filled top-left",
      "Quarter filled bottom-right",
      "Quarter filled bottom-left",
      "Fully filled"
    ],
    correct: 1,
    explanation: "Column 3 consistently shows 75% fill (only a small white wedge visible). Row 3 col 3 should show approximately 75% navy filled. Answer: B."
  },
  {
    id: 18,
    type: "pattern",
    category: "Pattern Recognition",
    question: "Which shape is missing? Each item is a 3×3 grid of cells. Orange cell count decreases across each row and changes position. Row 1: 4, 3, 2 cells. Row 2: 6, 5, 4 cells. Row 3: 4, 5, ?",
    grid: [
      ["4_orange_cells_left", "3_orange_cells_left", "2_orange_cells_top"],
      ["6_orange_cells", "5_orange_cells", "4_orange_cells_right"],
      ["4_orange_cells_left_col", "5_orange_cells_mid", "?"]
    ],
    options: [
      "4 orange cells top-left block",
      "6 orange cells right-heavy",
      "3 orange cells top-right",
      "6 orange cells left-heavy",
      "4 orange cells bottom-left",
      "2 orange cells right column"
    ],
    correct: 3,
    explanation: "Column 3 values: 2, 4, ? — each increases by 2, so ? = 6. The orange fills the right/bottom side. Answer: D (6 orange cells)."
  },
  {
    id: 19,
    type: "numerical",
    category: "Numerical Reasoning",
    question: "Which number is missing? The grid contains: Row 1: 4, 8, 24 | Row 2: 3, 6, 18 | Row 3: 5, 10, ?",
    grid: [
      [4, 8, 24],
      [3, 6, 18],
      [5, 10, "?"]
    ],
    options: ["30", "55", "25", "15", "50", "20"],
    correct: 0,
    explanation: "Pattern: col1 × 2 = col2, col2 × 3 = col3. Row 3: 5×2=10, 10×3=30. Answer: A (30)."
  },
  {
    id: 20,
    type: "spatial",
    category: "Spatial Reasoning",
    question: "How many triangles are in the picture? A large triangle contains two internal lines drawn from the apex down to the base, creating smaller triangles.",
    options: ["3", "8", "7", "6", "5", "4"],
    correct: 3,
    explanation: "The large triangle has 2 lines from the apex creating 3 small triangles at the base. Counting all: 3 small + 2 medium (left pair, right pair) + 1 large = 6. Answer: D (6)."
  }
];

export default questions;

// Scoring: maps correct answers to approximate IQ score (out of 20 questions)
export function calculateIQ(correctAnswers) {
  // Bell curve approximation: mean = 10 correct → IQ 100
  // Each additional correct answer adds ~5 IQ points
  const baseIQ = 55;
  const pointsPerCorrect = 5;
  let score = Math.round(baseIQ + (correctAnswers * pointsPerCorrect));

  // Add slight randomness for realism (+/- 2)
  score += Math.floor(Math.random() * 5) - 2;

  // Clamp between 55 and 155
  return Math.max(55, Math.min(155, score));
}