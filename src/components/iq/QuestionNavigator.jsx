import React from "react";

export default function QuestionNavigator({ total, current, answers, onNavigate }) {
  return (
    <div className="bg-[#2d2d2d] rounded-2xl p-4 mt-6">
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: total }, (_, i) => {
          const isActive = i === current;
          const isAnswered = answers[i] !== undefined;

          return (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${
                isActive
                  ? "bg-white text-[#0C3547] shadow-lg scale-110"
                  : isAnswered
                  ? "bg-[#F5921B] text-white"
                  : "bg-[#444] text-gray-300 hover:bg-[#555]"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}