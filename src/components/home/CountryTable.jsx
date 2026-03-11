import React from "react";
import { motion } from "framer-motion";

const countries = [
  { rank: 1, name: "Singapore", iq: 108 },
  { rank: 2, name: "Hong Kong", iq: 108 },
  { rank: 3, name: "Taiwan", iq: 106 },
  { rank: 4, name: "South Korea", iq: 106 },
  { rank: 5, name: "Japan", iq: 105 },
  { rank: 6, name: "China", iq: 104 },
  { rank: 7, name: "Switzerland", iq: 102 },
  { rank: 8, name: "Netherlands", iq: 102 },
  { rank: 9, name: "Iceland", iq: 101 },
  { rank: 10, name: "Finland", iq: 101 },
  { rank: 11, name: "Canada", iq: 101 },
  { rank: 12, name: "Belgium", iq: 100 },
  { rank: 13, name: "Germany", iq: 100 },
  { rank: 14, name: "United Kingdom", iq: 100 },
  { rank: 15, name: "Austria", iq: 100 },
  { rank: 16, name: "New Zealand", iq: 100 },
  { rank: 17, name: "Israel", iq: 100 },
  { rank: 18, name: "Norway", iq: 99 },
  { rank: 19, name: "Sweden", iq: 99 },
  { rank: 20, name: "Denmark", iq: 99 },
  { rank: 21, name: "Czech Republic", iq: 99 },
  { rank: 22, name: "Australia", iq: 99 },
  { rank: 23, name: "France", iq: 98 },
  { rank: 24, name: "United States", iq: 98 },
  { rank: 25, name: "Spain", iq: 97 },
  { rank: 26, name: "Italy", iq: 97 },
  { rank: 27, name: "Portugal", iq: 96 },
  { rank: 28, name: "Poland", iq: 96 },
  { rank: 29, name: "Russia", iq: 96 },
  { rank: 30, name: "Ireland", iq: 96 },
];

export default function CountryTable() {
  const cols = [
    countries.slice(0, 10),
    countries.slice(10, 20),
    countries.slice(20, 30),
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-[#0C3547] mb-12"
        >
          Average IQ Scores By Country
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cols.map((col, colIdx) => (
            <motion.div
              key={colIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: colIdx * 0.15 }}
              className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100"
            >
              <div className="grid grid-cols-[50px_1fr_60px] gap-2 px-4 py-3 bg-[#0C3547] text-white text-sm font-semibold">
                <span>#</span>
                <span>Country</span>
                <span className="text-right">IQ</span>
              </div>
              {col.map((c, i) => (
                <div
                  key={c.rank}
                  className={`grid grid-cols-[50px_1fr_60px] gap-2 px-4 py-3 text-sm ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-orange-50 transition-colors`}
                >
                  <span className="text-gray-400 font-medium">{c.rank}</span>
                  <span className="font-medium text-gray-800">{c.name}</span>
                  <span className="text-right font-bold text-[#0C3547]">{c.iq}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}