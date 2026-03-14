import React from "react";

const S = 48; // SVG viewBox size
const sw = 2.5; // strokeWidth
const color = "#0C3547";

const Svg = ({ children }) => (
  <svg width="100%" height="100%" viewBox={`0 0 ${S} ${S}`} fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const shapes = {
  // ── Arrows ──────────────────────────────────────────────
  arrow_up_right_small: () => (
    <Svg>
      <line x1="14" y1="34" x2="34" y2="14" />
      <polyline points="20,14 34,14 34,28" />
    </Svg>
  ),
  arrow_up_right_large: () => (
    <Svg>
      <line x1="10" y1="38" x2="38" y2="10" />
      <polyline points="16,10 38,10 38,32" />
    </Svg>
  ),
  arrow_down_left_small: () => (
    <Svg>
      <line x1="34" y1="14" x2="14" y2="34" />
      <polyline points="28,34 14,34 14,20" />
    </Svg>
  ),
  arrow_down_right: () => (
    <Svg>
      <line x1="14" y1="14" x2="34" y2="34" />
      <polyline points="34,20 34,34 20,34" />
    </Svg>
  ),
  arrow_diagonal_both: () => (
    <Svg>
      {/* two diagonal arrows crossing */}
      <line x1="10" y1="38" x2="38" y2="10" />
      <polyline points="16,10 38,10 38,32" />
      <line x1="10" y1="10" x2="38" y2="38" />
      <polyline points="38,16 38,38 16,38" />
    </Svg>
  ),
  arrow_up_left: () => (
    <Svg>
      <line x1="38" y1="38" x2="10" y2="10" />
      <polyline points="32,10 10,10 10,32" />
    </Svg>
  ),

  // ── Squares with diagonals ───────────────────────────────
  square_left_diagonals: () => (
    <Svg>
      <rect x="8" y="8" width="32" height="32" />
      {/* left triangle: top-left to top-mid and top-left to bot-left (X from left) */}
      <line x1="8" y1="8" x2="24" y2="24" />
      <line x1="8" y1="40" x2="24" y2="24" />
    </Svg>
  ),
  square_full_diagonals: () => (
    <Svg>
      <rect x="8" y="8" width="32" height="32" />
      <line x1="8" y1="8" x2="40" y2="40" />
      <line x1="40" y1="8" x2="8" y2="40" />
    </Svg>
  ),
  square_right_diagonals: () => (
    <Svg>
      <rect x="8" y="8" width="32" height="32" />
      <line x1="40" y1="8" x2="24" y2="24" />
      <line x1="40" y1="40" x2="24" y2="24" />
    </Svg>
  ),

  // ── Shapes for Q5 ────────────────────────────────────────
  circle: () => (
    <Svg><circle cx="24" cy="24" r="16" /></Svg>
  ),
  circle_in_diamond: () => (
    <Svg>
      <polygon points="24,6 42,24 24,42 6,24" />
      <circle cx="24" cy="24" r="10" />
    </Svg>
  ),
  diamond: () => (
    <Svg><polygon points="24,6 42,24 24,42 6,24" /></Svg>
  ),
  square_in_circle: () => (
    <Svg>
      <circle cx="24" cy="24" r="16" />
      <rect x="14" y="14" width="20" height="20" />
    </Svg>
  ),
  nested_square_with_dot: () => (
    <Svg>
      <rect x="8" y="8" width="32" height="32" />
      <rect x="16" y="16" width="16" height="16" />
      <circle cx="24" cy="24" r="2" fill={color} stroke="none" />
    </Svg>
  ),
  diamond_with_dot: () => (
    <Svg>
      <polygon points="24,6 42,24 24,42 6,24" />
      <circle cx="24" cy="24" r="2.5" fill={color} stroke="none" />
    </Svg>
  ),
  square: () => (
    <Svg><rect x="10" y="10" width="28" height="28" /></Svg>
  ),
  square_with_dot: () => (
    <Svg>
      <rect x="10" y="10" width="28" height="28" />
      <circle cx="24" cy="24" r="2.5" fill={color} stroke="none" />
    </Svg>
  ),
  dot_only: () => (
    <Svg><circle cx="24" cy="24" r="3.5" fill={color} stroke="none" /></Svg>
  ),

  // ── Shapes for Q7 ────────────────────────────────────────
  diamond_with_filled_triangle: () => (
    <Svg>
      <polygon points="24,6 42,24 24,42 6,24" />
      <polygon points="24,14 34,34 14,34" fill={color} />
    </Svg>
  ),
  filled_triangle: () => (
    <Svg><polygon points="24,8 42,40 6,40" fill={color} stroke="none" /></Svg>
  ),
  circle_in_diamond: () => (
    <Svg>
      <polygon points="24,6 42,24 24,42 6,24" />
      <circle cx="24" cy="24" r="10" />
    </Svg>
  ),
  nested_circle_with_triangle: () => (
    <Svg>
      <polygon points="24,6 42,24 24,42 6,24" />
      <circle cx="24" cy="24" r="10" />
      <polygon points="24,16 32,32 16,32" fill={color} />
    </Svg>
  ),
  square_with_triangle: () => (
    <Svg>
      <rect x="8" y="8" width="32" height="32" />
      <polygon points="24,14 38,38 10,38" fill={color} />
    </Svg>
  ),
  circle_with_square: () => (
    <Svg>
      <circle cx="24" cy="24" r="16" />
      <rect x="15" y="15" width="18" height="18" />
    </Svg>
  ),

  // ── Mini orange-cell grid shapes for Q10/Q18 (rendered as mini grid) ──
  orange_top_left: () => <MiniGrid highlight={[0]} />,
  orange_top_center: () => <MiniGrid highlight={[1]} />,
  orange_top_right: () => <MiniGrid highlight={[2]} />,
  orange_mid_left: () => <MiniGrid highlight={[3]} />,
  orange_center: () => <MiniGrid highlight={[4]} />,
  orange_mid_right: () => <MiniGrid highlight={[5]} />,
  orange_bottom_left: () => <MiniGrid highlight={[6]} />,
  orange_bottom_center: () => <MiniGrid highlight={[7]} />,

  // Q18 cell counts
  "4_orange_cells_left": () => <MiniGrid highlight={[0,1,3,4]} />,
  "3_orange_cells_left": () => <MiniGrid highlight={[0,3,6]} />,
  "2_orange_cells_top": () => <MiniGrid highlight={[0,1]} />,
  "6_orange_cells": () => <MiniGrid highlight={[0,1,2,3,4,5]} />,
  "5_orange_cells": () => <MiniGrid highlight={[0,1,2,3,4]} />,
  "4_orange_cells_right": () => <MiniGrid highlight={[1,2,4,5]} />,
  "4_orange_cells_left_col": () => <MiniGrid highlight={[0,3,6,7]} />,
  "5_orange_cells_mid": () => <MiniGrid highlight={[0,1,3,4,6]} />,

  // ── Wedge circles for Q6 (simplified) ───────────────────
  "2_wedges_top_left": () => <WedgeCircle count={2} startAngle={180} />,
  "3_wedges_top_right": () => <WedgeCircle count={3} startAngle={270} />,
  "4_wedges_right": () => <WedgeCircle count={4} startAngle={315} />,
  "1_wedge_bottom_left": () => <WedgeCircle count={1} startAngle={135} />,
  "2_wedges_bottom": () => <WedgeCircle count={2} startAngle={90} />,
  "3_wedges_bottom_right": () => <WedgeCircle count={3} startAngle={45} />,
  "1_wedge_left": () => <WedgeCircle count={1} startAngle={180} />,
  "2_wedges_bottom_left": () => <WedgeCircle count={2} startAngle={135} />,

  // ── Partially-filled circles for Q17 ────────────────────
  circle_25pct: () => <FilledCircle pct={0.25} startAngle={-90} />,
  circle_50pct: () => <FilledCircle pct={0.50} startAngle={-90} />,
  circle_75pct: () => <FilledCircle pct={0.75} startAngle={-90} />,
  circle_25pct_rotated: () => <FilledCircle pct={0.25} startAngle={0} />,
  circle_25pct_more_rotated: () => <FilledCircle pct={0.25} startAngle={90} />,
  circle_25pct_further: () => <FilledCircle pct={0.25} startAngle={180} />,
  circle_25pct_bottom: () => <FilledCircle pct={0.25} startAngle={-180} />,
  circle_50pct_bottom: () => <FilledCircle pct={0.50} startAngle={0} />,

  // ── Isometric cube shapes for Q5 ─────────────────────────
  // Cube: top face, left face, right face as isometric projection
  // Points: top-center(24,6), right(40,15), bottom-center(24,24), left(8,15)
  //         left-bottom(8,39), bottom-center-low(24,48), right-bottom(40,39)
  cube_right_filled: () => (
    <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
      {/* top face - white */}
      <polygon points="24,6 40,15 24,24 8,15" fill="white" stroke="#F5921B" strokeWidth="1.5"/>
      {/* left face - white */}
      <polygon points="8,15 24,24 24,42 8,33" fill="white" stroke="#F5921B" strokeWidth="1.5"/>
      {/* right face - navy */}
      <polygon points="24,24 40,15 40,33 24,42" fill="#0C3547" stroke="#F5921B" strokeWidth="1.5"/>
    </svg>
  ),
  cube_bottom_filled: () => (
    <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
      {/* top face - white */}
      <polygon points="24,6 40,15 24,24 8,15" fill="white" stroke="#F5921B" strokeWidth="1.5"/>
      {/* left face - white */}
      <polygon points="8,15 24,24 24,42 8,33" fill="white" stroke="#F5921B" strokeWidth="1.5"/>
      {/* right face - white */}
      <polygon points="24,24 40,15 40,33 24,42" fill="white" stroke="#F5921B" strokeWidth="1.5"/>
      {/* bottom diamond accent */}
      <polygon points="24,30 36,24 24,18 12,24" fill="#0C3547" stroke="#F5921B" strokeWidth="1"/>
    </svg>
  ),
  cube_top_filled: () => (
    <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
      {/* top face - navy */}
      <polygon points="24,6 40,15 24,24 8,15" fill="#0C3547" stroke="#F5921B" strokeWidth="1.5"/>
      {/* left face - white */}
      <polygon points="8,15 24,24 24,42 8,33" fill="white" stroke="#F5921B" strokeWidth="1.5"/>
      {/* right face - white */}
      <polygon points="24,24 40,15 40,33 24,42" fill="white" stroke="#F5921B" strokeWidth="1.5"/>
    </svg>
  ),
  cube_all_filled: () => (
    <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
      <polygon points="24,6 40,15 24,24 8,15" fill="#0C3547" stroke="#F5921B" strokeWidth="1.5"/>
      <polygon points="8,15 24,24 24,42 8,33" fill="#0C3547" stroke="#F5921B" strokeWidth="1.5"/>
      <polygon points="24,24 40,15 40,33 24,42" fill="#0C3547" stroke="#F5921B" strokeWidth="1.5"/>
    </svg>
  ),
  cube_left_top_filled: () => (
    <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
      {/* top face - navy */}
      <polygon points="24,6 40,15 24,24 8,15" fill="#0C3547" stroke="#F5921B" strokeWidth="1.5"/>
      {/* left face - navy */}
      <polygon points="8,15 24,24 24,42 8,33" fill="#0C3547" stroke="#F5921B" strokeWidth="1.5"/>
      {/* right face - white */}
      <polygon points="24,24 40,15 40,33 24,42" fill="white" stroke="#F5921B" strokeWidth="1.5"/>
    </svg>
  ),
  cube_top_only_filled: () => (
    <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
      {/* top face - navy */}
      <polygon points="24,6 40,15 24,24 8,15" fill="#0C3547" stroke="#F5921B" strokeWidth="1.5"/>
      {/* left face - white */}
      <polygon points="8,15 24,24 24,42 8,33" fill="white" stroke="#F5921B" strokeWidth="1.5"/>
      {/* right face - white, smaller */}
      <polygon points="24,24 40,15 40,33 24,42" fill="white" stroke="#F5921B" strokeWidth="1.5"/>
    </svg>
  ),

  // ── Answer shapes for Q10 (3×3 grid with orange cells) ──
  // Helper: 3x3 grid with specified cells filled orange
  // cells = array of [row, col] (0-indexed)
  // A: mid-center + mid-right (rows 1, cols 1 and 2)
  q10_optA: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="1" fill="white" stroke="#0C3547" strokeWidth="3"/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*18} y={4+r*18} width="16" height="16"
          fill={((r===1&&c===1)||(r===1&&c===2)) ? "#F5921B" : "white"}
          stroke="#0C3547" strokeWidth="1.5"/>
      )))}
    </svg>
  ),
  // B: top-right + center-middle (correct) — [0,2] and [1,1]
  q10_optB: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="1" fill="white" stroke="#0C3547" strokeWidth="3"/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*18} y={4+r*18} width="16" height="16"
          fill={((r===0&&c===2)||(r===1&&c===1)) ? "#F5921B" : "white"}
          stroke="#0C3547" strokeWidth="1.5"/>
      )))}
    </svg>
  ),
  // C: center + bottom-left — [1,1] and [2,0]
  q10_optC: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="1" fill="white" stroke="#0C3547" strokeWidth="3"/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*18} y={4+r*18} width="16" height="16"
          fill={((r===1&&c===1)||(r===2&&c===0)) ? "#F5921B" : "white"}
          stroke="#0C3547" strokeWidth="1.5"/>
      )))}
    </svg>
  ),
  // D: center + bottom-center — [1,1] and [2,1]
  q10_optD: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="1" fill="white" stroke="#0C3547" strokeWidth="3"/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*18} y={4+r*18} width="16" height="16"
          fill={((r===1&&c===1)||(r===2&&c===1)) ? "#F5921B" : "white"}
          stroke="#0C3547" strokeWidth="1.5"/>
      )))}
    </svg>
  ),
  // E: top-left + center — [0,0] and [1,1]
  q10_optE: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="1" fill="white" stroke="#0C3547" strokeWidth="3"/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*18} y={4+r*18} width="16" height="16"
          fill={((r===0&&c===0)||(r===1&&c===1)) ? "#F5921B" : "white"}
          stroke="#0C3547" strokeWidth="1.5"/>
      )))}
    </svg>
  ),
  // F: top-center + center — [0,1] and [1,1]
  q10_optF: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="1" fill="white" stroke="#0C3547" strokeWidth="3"/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*18} y={4+r*18} width="16" height="16"
          fill={((r===0&&c===1)||(r===1&&c===1)) ? "#F5921B" : "white"}
          stroke="#0C3547" strokeWidth="1.5"/>
      )))}
    </svg>
  ),

  // ── Answer shapes for Q15 (10-wedge circles, orange sections at various positions) ──
  // Helper inline: 10-wedge circle with N consecutive orange wedges starting at angle
  // A: 3 wedges top-left (~300° start)
  q15_optA: () => <WedgeCircle10 count={3} startAngle={270} />,
  // B: 2 wedges right (~0° start)
  q15_optB: () => <WedgeCircle10 count={2} startAngle={0} />,
  // C: 3 wedges bottom-center (~90° start)
  q15_optC: () => <WedgeCircle10 count={3} startAngle={90} />,
  // D: 2 wedges bottom-right (~45° start)
  q15_optD: () => <WedgeCircle10 count={2} startAngle={45} />,
  // E: 3 wedges bottom-left (~135° start)
  q15_optE: () => <WedgeCircle10 count={3} startAngle={135} />,
  // F (correct): 2 wedges bottom-left (~135° start)
  q15_optF: () => <WedgeCircle10 count={2} startAngle={135} />,

  // ── Answer shapes for Q13 (3×3 grid orange cell patterns) ──
  // A: left+right columns, top 2 rows [0,1,3,5] → cols 0,2 rows 0,1
  q13_optA: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="2" fill="white" stroke="#0C3547" strokeWidth="3"/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*18} y={4+r*18} width="16" height="16"
          fill={((c===0||c===2)&&(r===0||r===1)) ? "#F5921B" : "white"}
          stroke="#0C3547" strokeWidth="1.5"/>
      )))}
    </svg>
  ),
  // B: top row + bottom row fully orange [0,1,2,6,7,8]
  q13_optB: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="2" fill="white" stroke="#0C3547" strokeWidth="3"/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*18} y={4+r*18} width="16" height="16"
          fill={(r===0||r===2) ? "#F5921B" : "white"}
          stroke="#0C3547" strokeWidth="1.5"/>
      )))}
    </svg>
  ),
  // C: top 2 rows fully orange [0,1,2,3,4,5]
  q13_optC: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="2" fill="white" stroke="#0C3547" strokeWidth="3"/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*18} y={4+r*18} width="16" height="16"
          fill={(r===0||r===1) ? "#F5921B" : "white"}
          stroke="#0C3547" strokeWidth="1.5"/>
      )))}
    </svg>
  ),
  // D: left col + right col all rows [0,2,3,5,6,8]
  q13_optD: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="2" fill="white" stroke="#0C3547" strokeWidth="3"/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*18} y={4+r*18} width="16" height="16"
          fill={(c===0||c===2) ? "#F5921B" : "white"}
          stroke="#0C3547" strokeWidth="1.5"/>
      )))}
    </svg>
  ),
  // E: middle row + middle col (cross) [1,3,4,5,7]
  q13_optE: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="2" fill="white" stroke="#0C3547" strokeWidth="3"/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*18} y={4+r*18} width="16" height="16"
          fill={(r===1||c===1) ? "#F5921B" : "white"}
          stroke="#0C3547" strokeWidth="1.5"/>
      )))}
    </svg>
  ),
  // F (correct): center + bottom-center + bottom-right [4,7,8]
  q13_optF: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="2" fill="white" stroke="#0C3547" strokeWidth="3"/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={4+c*18} y={4+r*18} width="16" height="16"
          fill={((r===1&&c===1)||(r===2&&c===1)||(r===2&&c===2)) ? "#F5921B" : "white"}
          stroke="#0C3547" strokeWidth="1.5"/>
      )))}
    </svg>
  ),

  // ── Answer shapes for Q8 (box with orange shapes in corners) ──
  // A: orange square top-right, orange circle top-left
  q8_optA: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="2" fill="#f0f0f0" stroke="#0C3547" strokeWidth="2.5"/>
      <rect x="38" y="8" width="14" height="14" fill="#F5921B"/>
      <circle cx="16" cy="16" r="7" fill="#F5921B"/>
    </svg>
  ),
  // B: orange square top-right, orange circle bottom-left (correct)
  q8_optB: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="2" fill="#f0f0f0" stroke="#0C3547" strokeWidth="2.5"/>
      <rect x="38" y="8" width="14" height="14" fill="#F5921B"/>
      <circle cx="16" cy="44" r="7" fill="#F5921B"/>
    </svg>
  ),
  // C: orange circle top-right, orange circle bottom-left
  q8_optC: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="2" fill="#f0f0f0" stroke="#0C3547" strokeWidth="2.5"/>
      <circle cx="44" cy="16" r="7" fill="#F5921B"/>
      <circle cx="16" cy="44" r="7" fill="#F5921B"/>
    </svg>
  ),
  // D: small square outline top-left, orange circle bottom-right
  q8_optD: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="2" fill="#f0f0f0" stroke="#0C3547" strokeWidth="2.5"/>
      <rect x="8" y="8" width="12" height="12" fill="none" stroke="#0C3547" strokeWidth="1.5"/>
      <circle cx="44" cy="44" r="7" fill="#F5921B"/>
    </svg>
  ),
  // E: orange square top-right, circle outline bottom-left
  q8_optE: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="2" fill="#f0f0f0" stroke="#0C3547" strokeWidth="2.5"/>
      <rect x="38" y="8" width="14" height="14" fill="#F5921B"/>
      <circle cx="16" cy="44" r="7" fill="none" stroke="#F5921B" strokeWidth="1.5"/>
    </svg>
  ),
  // F: orange square top-left, orange circle bottom-right
  q8_optF: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <rect x="2" y="2" width="56" height="56" rx="2" fill="#f0f0f0" stroke="#0C3547" strokeWidth="2.5"/>
      <rect x="8" y="8" width="14" height="14" fill="#F5921B"/>
      <circle cx="44" cy="44" r="7" fill="#F5921B"/>
    </svg>
  ),

  // ── Answer shapes for Q6 (orange rect with navy band + white lines) ──
  // A: navy center band, white diagonal lines diverging upward, horizontal line bottom
  q6_optA: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 42" fill="none">
      <rect width="60" height="42" fill="#F5921B"/>
      <rect x="18" y="0" width="24" height="42" fill="#0C3547"/>
      <line x1="24" y1="0" x2="18" y2="32" stroke="white" strokeWidth="1.5"/>
      <line x1="36" y1="0" x2="42" y2="32" stroke="white" strokeWidth="1.5"/>
      <line x1="0" y1="32" x2="60" y2="32" stroke="white" strokeWidth="1.5"/>
    </svg>
  ),
  // B: navy dominant right, orange left strip, diagonal lines
  q6_optB: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 42" fill="none">
      <rect width="60" height="42" fill="#0C3547"/>
      <rect x="0" y="0" width="12" height="42" fill="#F5921B"/>
      <rect x="48" y="0" width="12" height="42" fill="#F5921B"/>
      <line x1="12" y1="0" x2="30" y2="42" stroke="white" strokeWidth="1.5"/>
      <line x1="48" y1="0" x2="30" y2="21" stroke="white" strokeWidth="1.5"/>
      <line x1="0" y1="21" x2="60" y2="21" stroke="white" strokeWidth="1.5"/>
    </svg>
  ),
  // C: navy dominant, orange right strip, diagonal lines going left
  q6_optC: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 42" fill="none">
      <rect width="60" height="42" fill="#0C3547"/>
      <rect x="0" y="0" width="10" height="42" fill="#F5921B"/>
      <rect x="50" y="0" width="10" height="42" fill="#F5921B"/>
      <line x1="10" y1="14" x2="50" y2="28" stroke="white" strokeWidth="1.5"/>
      <line x1="10" y1="28" x2="50" y2="14" stroke="white" strokeWidth="1.5"/>
      <line x1="0" y1="21" x2="60" y2="21" stroke="white" strokeWidth="1.5"/>
    </svg>
  ),
  // D: navy center band, orange strips, straight vertical lines
  q6_optD: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 42" fill="none">
      <rect width="60" height="42" fill="#F5921B"/>
      <rect x="18" y="0" width="24" height="42" fill="#0C3547"/>
      <line x1="18" y1="0" x2="18" y2="42" stroke="white" strokeWidth="1.5"/>
      <line x1="42" y1="0" x2="42" y2="42" stroke="white" strokeWidth="1.5"/>
      <line x1="0" y1="21" x2="60" y2="21" stroke="white" strokeWidth="1.5"/>
    </svg>
  ),
  // E: navy center band wider at bottom (trapezoid), orange sides, horizontal line, correct answer
  q6_optE: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 42" fill="none">
      <rect width="60" height="42" fill="#F5921B"/>
      <polygon points="22,0 38,0 46,42 14,42" fill="#0C3547"/>
      <line x1="22" y1="0" x2="14" y2="42" stroke="white" strokeWidth="1.5"/>
      <line x1="38" y1="0" x2="46" y2="42" stroke="white" strokeWidth="1.5"/>
      <line x1="0" y1="21" x2="60" y2="21" stroke="white" strokeWidth="1.5"/>
    </svg>
  ),
  // F: navy center band, orange sides, one diagonal line off-center
  q6_optF: () => (
    <svg width="100%" height="100%" viewBox="0 0 60 42" fill="none">
      <rect width="60" height="42" fill="#F5921B"/>
      <rect x="18" y="0" width="24" height="42" fill="#0C3547"/>
      <line x1="30" y1="0" x2="18" y2="42" stroke="white" strokeWidth="1.5"/>
      <line x1="0" y1="14" x2="60" y2="14" stroke="white" strokeWidth="1.5"/>
      <line x1="0" y1="28" x2="60" y2="28" stroke="white" strokeWidth="1.5"/>
    </svg>
  ),

  // ── Answer shapes for Q3 ─────────────────────────────────
  tall_rect: () => (
    <Svg><rect x="16" y="6" width="16" height="36" /></Svg>
  ),
  wide_rect: () => (
    <Svg><rect x="6" y="16" width="36" height="16" /></Svg>
  ),
  triangle: () => (
    <Svg><polygon points="24,8 42,40 6,40" /></Svg>
  ),
  vertical_line: () => (
    <Svg><line x1="24" y1="6" x2="24" y2="42" /></Svg>
  ),
  oval: () => (
    <Svg><ellipse cx="24" cy="24" rx="18" ry="10" /></Svg>
  ),

  // ── Hexagon wedge fills for Q14 (simplified) ────────────
  navy_dominant_left_orange: () => <HexWedge orangeFraction={0.15} rotOffset={0} />,
  navy_dominant_right_orange: () => <HexWedge orangeFraction={0.15} rotOffset={60} />,
  orange_dominant_left_navy: () => <HexWedge orangeFraction={0.7} rotOffset={120} />,
  navy_large_bottom_orange: () => <HexWedge orangeFraction={0.2} rotOffset={180} />,
  navy_center_triangle: () => <HexWedge orangeFraction={0.1} rotOffset={240} />,
  navy_right_small_orange: () => <HexWedge orangeFraction={0.15} rotOffset={300} />,
  navy_bottom_triangle: () => <HexWedge orangeFraction={0.1} rotOffset={30} />,
  orange_dominant_navy_triangle: () => <HexWedge orangeFraction={0.65} rotOffset={90} />,
};

// ── Helper: Mini 3×3 grid with highlighted (orange) cells ─────────────────
function MiniGrid({ highlight }) {
  const cells = Array.from({ length: 9 }, (_, i) => i);
  return (
    <svg width="100%" height="100%" viewBox="0 0 48 48">
      {cells.map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 6 + col * 13;
        const y = 6 + row * 13;
        return (
          <rect key={i} x={x} y={y} width="11" height="11" rx="1"
            fill={highlight.includes(i) ? "#F5921B" : "none"}
            stroke={color} strokeWidth="1.5" />
        );
      })}
    </svg>
  );
}

// ── Helper: Pie / filled circle ───────────────────────────────────────────
function FilledCircle({ pct, startAngle }) {
  const cx = 24, cy = 24, r = 16;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const endAngle = startAngle + pct * 360;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const largeArc = pct > 0.5 ? 1 : 0;
  return (
    <svg width="100%" height="100%" viewBox="0 0 48 48">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={sw} />
      <path d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
        fill={color} stroke="none" />
    </svg>
  );
}

// ── Helper: Circle with N orange wedges (out of 10, no dividers) ─────────
function WedgeCircle10({ count, startAngle }) {
  const cx = 24, cy = 24, r = 16;
  const total = 10;
  const step = 360 / total;
  const toRad = (d) => (d * Math.PI) / 180;
  return (
    <svg width="100%" height="100%" viewBox="0 0 48 48">
      <circle cx={cx} cy={cy} r={r} fill="white" stroke="#0C3547" strokeWidth="2"/>
      {Array.from({ length: total }, (_, i) => {
        const a1 = toRad(startAngle + i * step);
        const a2 = toRad(startAngle + (i + 1) * step);
        const x1 = cx + r * Math.cos(a1);
        const y1 = cy + r * Math.sin(a1);
        const x2 = cx + r * Math.cos(a2);
        const y2 = cy + r * Math.sin(a2);
        const filled = i < count;
        return (
          <path key={i}
            d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
            fill={filled ? "#F5921B" : "none"}
            stroke="#0C3547" strokeWidth="1.2"/>
        );
      })}
      <circle cx={cx} cy={cy} r="2.5" fill="#0C3547"/>
    </svg>
  );
}

// ── Helper: Circle with N orange wedges (out of 10) ───────────────────────
function WedgeCircle({ count, startAngle }) {
  const cx = 24, cy = 24, r = 16;
  const total = 10;
  const step = 360 / total;
  const toRad = (d) => (d * Math.PI) / 180;
  const wedges = Array.from({ length: count }, (_, i) => {
    const a1 = startAngle + i * step;
    const a2 = a1 + step;
    const x1 = cx + r * Math.cos(toRad(a1));
    const y1 = cy + r * Math.sin(toRad(a1));
    const x2 = cx + r * Math.cos(toRad(a2));
    const y2 = cy + r * Math.sin(toRad(a2));
    return <path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
      fill="#F5921B" stroke="none" />;
  });
  return (
    <svg width="100%" height="100%" viewBox="0 0 48 48">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={sw} />
      {wedges}
      {/* dividing lines */}
      {Array.from({ length: total }, (_, i) => {
        const a = toRad(startAngle + i * step);
        return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)}
          stroke={color} strokeWidth="1" />;
      })}
    </svg>
  );
}

// ── Helper: Hexagon with fraction filled orange ───────────────────────────
function HexWedge({ orangeFraction, rotOffset }) {
  const cx = 24, cy = 24, r = 18;
  const toRad = (d) => (d * Math.PI) / 180;
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = toRad(i * 60 - 30);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  const pts = hex.map((p) => p.join(",")).join(" ");
  const orangeSlices = Math.round(orangeFraction * 6);
  const fillPaths = Array.from({ length: orangeSlices }, (_, i) => {
    const idx = (i + Math.round(rotOffset / 60)) % 6;
    const [x1, y1] = hex[idx];
    const [x2, y2] = hex[(idx + 1) % 6];
    return <polygon key={i} points={`${cx},${cy} ${x1},${y1} ${x2},${y2}`} fill="#F5921B" stroke="none" />;
  });
  return (
    <svg width="100%" height="100%" viewBox="0 0 48 48">
      {fillPaths}
      <polygon points={pts} fill="none" stroke={color} strokeWidth={sw} />
    </svg>
  );
}

export default function ShapeRenderer({ shapeName }) {
  // Numbers render as text
  if (typeof shapeName === "number") {
    return (
      <span className="text-xl font-bold text-[#0C3547]">{shapeName}</span>
    );
  }
  if (shapeName === "?") {
    return <span className="text-3xl font-bold text-white">?</span>;
  }

  const ShapeComponent = shapes[shapeName];
  if (ShapeComponent) return <ShapeComponent />;

  // Fallback: render as text (shouldn't happen with complete mapping)
  return <span className="text-xs text-gray-400 text-center leading-tight">{shapeName}</span>;
}