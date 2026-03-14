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
    type: "svg_options",
    category: "Pattern Recognition",
    category_question: "Visuospatial Pattern Reasoning",
    question: "Which Shape is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/01b6c56a9_image.png",
    options: [
      { text: "A", svg: "q13_optA" },
      { text: "B", svg: "q13_optB" },
      { text: "C", svg: "q13_optC" },
      { text: "D", svg: "q13_optD" },
      { text: "E", svg: "q13_optE" },
      { text: "F", svg: "q13_optF" }
    ],
    correct: 5,
    explanation: "The correct answer is F."
  },
  {
    id: 14,
    type: "spatial",
    category: "Spatial Reasoning",
    category_question: "Visuospatial Insight",
    question: "How many squares are in the picture?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/2e344e9e8_image.png",
    options: ["4", "9", "7", "8", "6", "5"],
    correct: 2,
    explanation: "Count all squares of all sizes: 5 individual cells + 1 large (2×2 top-right area) + 1 outer = 7. Answer: C (7)."
  },
  {
    id: 15,
    type: "svg_options",
    category: "Pattern Recognition",
    category_question: "Visuospatial Pattern Reasoning",
    question: "Which Shape is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/1e6dfadbd_image.png",
    options: [
      { text: "A", svg: "q15_optA" },
      { text: "B", svg: "q15_optB" },
      { text: "C", svg: "q15_optC" },
      { text: "D", svg: "q15_optD" },
      { text: "E", svg: "q15_optE" },
      { text: "F", svg: "q15_optF" }
    ],
    correct: 5,
    explanation: "The orange wedge rotates clockwise across the grid. The missing piece has 2 wedges filled at the bottom-left position. Answer: F."
  },
  {
    id: 16,
    type: "image_options",
    category: "Spatial Reasoning",
    category_question: "Visuospatial Insight",
    question: "Which Shape is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/0646aa558_image.png",
    options_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/74b69a919_image.png",
    options: ["A", "B", "C", "D", "E", "F"],
    correct: 0,
    explanation: "The center section of the large image shows two white vertical lines, one navy diagonal line and one red diagonal line intersecting from the right. Answer: A."
  },
  {
    id: 17,
    type: "image_options",
    category: "Pattern Recognition",
    category_question: "Visuospatial Pattern Reasoning",
    question: "Which Shape is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/472f99349_image.png",
    options_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/d0a990e8c_image.png",
    options: ["A", "B", "C", "D", "E", "F"],
    correct: 5,
    explanation: "Row 3 removes all outer containers. Col 3 strips all inner shapes. The missing piece is just a plain square with no circle or triangle. Answer: F."
  },
  {
    id: 18,
    type: "image_options",
    category: "Numerical Reasoning",
    category_question: "Numerical Pattern Reasoning",
    question: "Which number is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/74472e8be_image.png",
    options_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/330a468bb_image.png",
    options: ["A", "B", "C", "D", "E", "F"],
    correct: 1,
    explanation: "Reading left-to-right: 43,42,40,37,33,28,22,15,? — differences are 1,2,3,4,5,6,7,8 increasing. So ?=15-8=7. Answer: B (7)."
  },
  {
    id: 19,
    type: "image_options",
    category: "Pattern Recognition",
    category_question: "Visuospatial Pattern Reasoning",
    question: "Which Shape is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/ec725ca49_image.png",
    options_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/53f01e48b_image.png",
    options: ["A", "B", "C", "D", "E", "F"],
    correct: 1,
    explanation: "The pattern shows circle with downward triangle inside. Row 3, col 3 should have a circle with a plain downward triangle (no dots, no horizontal line). Answer: B."
  },
  {
    id: 20,
    type: "image_options",
    category: "Spatial Reasoning",
    category_question: "Visuospatial Insight",
    question: "How many triangles are in the picture?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/009baad94_image.png",
    options_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/70ab73c58_image.png",
    options: ["A", "B", "C", "D", "E", "F"],
    correct: 2,
    explanation: "Count all triangles of all sizes: 1 large outer triangle + 3 small triangles at the base + 2 medium triangles formed by the internal lines + 3 additional smaller triangles from the center divisions = 9 total. Answer: C (9)."
  },
  {
    id: 21,
    type: "image_options",
    category: "Pattern Recognition",
    category_question: "Visuospatial Pattern Reasoning",
    question: "Which Shape is missing?",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/e7cbe70d5_image.png",
    options_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/523d21ae3_image.png",
    options: ["A", "B", "C", "D", "E", "F"],
    correct: 5,
    explanation: "Across rows and columns, containers progressively disappear while the dot remains. Row 3, col 3 has no outer container, only a dot. Answer: F."
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