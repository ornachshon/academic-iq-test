import React from "react";
import { countries } from "./countryData";

const cols = [countries.slice(0, 10), countries.slice(10, 20), countries.slice(20, 30)];

function TableCol({ data }) {
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-300">
          <th className="text-left py-2 px-3 text-gray-600 font-semibold w-10">#</th>
          <th className="text-left py-2 px-3 text-gray-600 font-semibold">Country</th>
          <th className="text-right py-2 px-3 text-gray-600 font-semibold">IQ</th>
        </tr>
      </thead>
      <tbody>
        {data.map((c) => (
          <tr key={c.rank} className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-2.5 px-3 text-gray-500">{c.rank}</td>
            <td className="py-2.5 px-3 text-gray-800">{c.name}</td>
            <td className="py-2.5 px-3 text-right text-gray-800 font-medium">{c.iq}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function CountryTable() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0C3547] mb-10">
          Average IQ Scores By Country
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cols.map((col, i) => (
            <div key={i} className="border border-gray-200 rounded">
              <TableCol data={col} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="#"
            className="text-[#0C3547] font-semibold text-sm underline hover:text-[#F5921B] transition-colors"
          >
            See The Full List
          </a>
        </div>
      </div>
    </section>
  );
}