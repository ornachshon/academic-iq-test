// IQ Test Questions - Pattern Recognition, Numerical, Spatial
// Each question has a type, prompt, visual description, and 6 answer options

const questions = [
  {
    id: 1,
    type: "pattern",
    question: "Which shape completes the pattern?",
    grid: [
      ["▲", "▲▲", "▲▲▲"],
      ["●", "●●", "●●●"],
      ["■", "■■", "?"]
    ],
    options: ["■■■", "■■", "●●●", "▲▲▲", "■", "●●"],
    correct: 0
  },
  {
    id: 2,
    type: "numerical",
    question: "What number comes next? 2, 6, 18, 54, ?",
    options: ["108", "162", "148", "216", "72", "96"],
    correct: 1
  },
  {
    id: 3,
    type: "pattern",
    question: "Which shape completes the sequence?",
    grid: [
      ["◆", "◇", "◆"],
      ["◇", "◆", "◇"],
      ["◆", "◇", "?"]
    ],
    options: ["◆", "◇", "○", "●", "□", "■"],
    correct: 0
  },
  {
    id: 4,
    type: "numerical",
    question: "What number is missing? 3, 9, 27, ?, 243",
    options: ["54", "72", "81", "108", "99", "63"],
    correct: 2
  },
  {
    id: 5,
    type: "spatial",
    question: "How many rectangles are in a 3×2 grid?",
    options: ["12", "15", "18", "10", "8", "20"],
    correct: 2
  },
  {
    id: 6,
    type: "pattern",
    question: "Which completes the pattern?",
    grid: [
      ["↑", "→", "↓"],
      ["←", "↑", "→"],
      ["↓", "←", "?"]
    ],
    options: ["↑", "→", "↓", "←", "↗", "↙"],
    correct: 0
  },
  {
    id: 7,
    type: "numerical",
    question: "What number comes next? 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "12", "13", "15", "10", "14"],
    correct: 2
  },
  {
    id: 8,
    type: "pattern",
    question: "Which shape completes the sequence?",
    grid: [
      ["○●○", "●○●", "○●○"],
      ["●○●", "○●○", "●○●"],
      ["○●○", "●○●", "?"]
    ],
    options: ["○●○", "●○●", "○○○", "●●●", "○●●", "●○○"],
    correct: 0
  },
  {
    id: 9,
    type: "numerical",
    question: "Find the missing number: 4, 16, 64, ?, 1024",
    options: ["128", "192", "256", "512", "384", "320"],
    correct: 2
  },
  {
    id: 10,
    type: "spatial",
    question: "If you fold a square paper in half twice and cut a corner, how many holes when unfolded?",
    options: ["1", "2", "4", "8", "3", "6"],
    correct: 2
  },
  {
    id: 11,
    type: "pattern",
    question: "Which completes the pattern?",
    grid: [
      ["1", "4", "9"],
      ["16", "25", "36"],
      ["49", "64", "?"]
    ],
    options: ["72", "80", "81", "100", "91", "76"],
    correct: 2
  },
  {
    id: 12,
    type: "numerical",
    question: "What comes next? 100, 95, 85, 70, 50, ?",
    options: ["20", "25", "30", "35", "15", "40"],
    correct: 1
  },
  {
    id: 13,
    type: "pattern",
    question: "Which shape completes the grid?",
    grid: [
      ["▲", "■", "●"],
      ["■", "●", "▲"],
      ["●", "▲", "?"]
    ],
    options: ["■", "●", "▲", "◆", "★", "○"],
    correct: 0
  },
  {
    id: 14,
    type: "numerical",
    question: "What number comes next? 2, 3, 5, 7, 11, 13, ?",
    options: ["15", "17", "19", "21", "14", "16"],
    correct: 1
  },
  {
    id: 15,
    type: "spatial",
    question: "How many triangles can you find in a triangle divided by 3 lines from each vertex to the opposite midpoint?",
    options: ["6", "8", "10", "12", "13", "16"],
    correct: 4
  },
  {
    id: 16,
    type: "pattern",
    question: "Which completes the sequence? A1, B2, C3, D4, ?",
    options: ["E5", "F6", "E4", "D5", "F5", "E6"],
    correct: 0
  },
  {
    id: 17,
    type: "numerical",
    question: "What is missing? 1, 4, 9, 16, 25, ?, 49",
    options: ["30", "32", "34", "36", "38", "40"],
    correct: 3
  },
  {
    id: 18,
    type: "pattern",
    question: "Which shape completes the pattern?",
    grid: [
      ["★", "☆", "★"],
      ["☆", "★", "☆"],
      ["★", "☆", "?"]
    ],
    options: ["★", "☆", "○", "●", "◆", "◇"],
    correct: 0
  },
  {
    id: 19,
    type: "numerical",
    question: "What comes next? 256, 128, 64, 32, ?",
    options: ["8", "12", "16", "24", "20", "10"],
    correct: 2
  },
  {
    id: 20,
    type: "spatial",
    question: "A cube has 6 faces. How many edges does it have?",
    options: ["8", "10", "12", "14", "16", "6"],
    correct: 2
  },
  {
    id: 21,
    type: "pattern",
    question: "What comes next in the sequence?",
    grid: [
      ["2", "4", "8"],
      ["3", "9", "27"],
      ["4", "16", "?"]
    ],
    options: ["32", "48", "64", "128", "56", "36"],
    correct: 2
  },
  {
    id: 22,
    type: "numerical",
    question: "What number comes next? 1, 3, 6, 10, 15, ?",
    options: ["18", "20", "21", "24", "25", "19"],
    correct: 2
  },
  {
    id: 23,
    type: "pattern",
    question: "Which completes the grid?",
    grid: [
      ["R", "G", "B"],
      ["G", "B", "R"],
      ["B", "R", "?"]
    ],
    options: ["G", "R", "B", "Y", "O", "P"],
    correct: 0
  },
  {
    id: 24,
    type: "numerical",
    question: "Find the pattern: 0, 1, 1, 2, 3, 5, 8, 13, ?",
    options: ["18", "19", "20", "21", "22", "24"],
    correct: 2  // not strictly fibonacci 21 — let me fix
  },
  {
    id: 25,
    type: "spatial",
    question: "If you rotate the letter 'N' 180°, what letter do you get?",
    options: ["N", "Z", "M", "W", "U", "S"],
    correct: 0
  },
  {
    id: 26,
    type: "pattern",
    question: "Which completes the sequence?",
    grid: [
      ["1", "3", "5"],
      ["7", "9", "11"],
      ["13", "15", "?"]
    ],
    options: ["16", "17", "18", "19", "20", "21"],
    correct: 1
  },
  {
    id: 27,
    type: "numerical",
    question: "What is missing? 5, 10, 20, 40, ?, 160",
    options: ["60", "70", "80", "90", "100", "120"],
    correct: 2
  },
  {
    id: 28,
    type: "spatial",
    question: "How many squares are on a standard 8×8 chessboard? (including all sizes)",
    options: ["64", "204", "256", "128", "196", "100"],
    correct: 1
  },
  {
    id: 29,
    type: "pattern",
    question: "Which completes the pattern?",
    grid: [
      ["A", "C", "E"],
      ["G", "I", "K"],
      ["M", "O", "?"]
    ],
    options: ["P", "Q", "R", "S", "T", "U"],
    correct: 1
  },
  {
    id: 30,
    type: "numerical",
    question: "What comes next? 1, 8, 27, 64, 125, ?",
    options: ["150", "196", "200", "216", "250", "225"],
    correct: 3
  }
];

// Fix question 24 (fibonacci): 0,1,1,2,3,5,8,13,21
questions[23] = {
  id: 24,
  type: "numerical",
  question: "Find the pattern: 0, 1, 1, 2, 3, 5, 8, 13, ?",
  options: ["18", "19", "20", "21", "24", "26"],
  correct: 3
};

export default questions;

// Scoring: maps correct answers to approximate IQ score
export function calculateIQ(correctAnswers) {
  // Bell curve approximation: mean = 15 correct → IQ 100
  // Each additional correct answer adds ~3.33 IQ points
  const baseIQ = 55;
  const pointsPerCorrect = 3.33;
  let score = Math.round(baseIQ + (correctAnswers * pointsPerCorrect));
  
  // Add slight randomness for realism (+/- 2)
  score += Math.floor(Math.random() * 5) - 2;
  
  // Clamp between 55 and 155
  return Math.max(55, Math.min(155, score));
}