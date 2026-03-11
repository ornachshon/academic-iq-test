import React from "react";

const countries = [
  { rank: 1,  name: "Singapore",     iq: 108 },
  { rank: 2,  name: "Hong Kong",      iq: 108 },
  { rank: 3,  name: "Taiwan",         iq: 106 },
  { rank: 4,  name: "South Korea",    iq: 106 },
  { rank: 5,  name: "Japan",          iq: 105 },
  { rank: 6,  name: "China",          iq: 104 },
  { rank: 7,  name: "Slovenia",       iq: 103 },
  { rank: 8,  name: "Switzerland",    iq: 102 },
  { rank: 9,  name: "The Netherlands",iq: 102 },
  { rank: 10, name: "North Korea",    iq: 102 },
  { rank: 11, name: "Macao",          iq: 101 },
  { rank: 12, name: "Iceland",        iq: 101 },
  { rank: 13, name: "Finland",        iq: 101 },
  { rank: 14, name: "Canada",         iq: 101 },
  { rank: 15, name: "Belgium",        iq: 100 },
  { rank: 16, name: "Germany",        iq: 100 },
  { rank: 17, name: "United Kingdom", iq: 100 },
  { rank: 18, name: "Austria",        iq: 100 },
  { rank: 19, name: "New Zealand",    iq: 100 },
  { rank: 20, name: "Israel",         iq: 100 },
  { rank: 21, name: "Malta",          iq: 99  },
  { rank: 22, name: "Slovakia",       iq: 99  },
  { rank: 23, name: "Norway",         iq: 99  },
  { rank: 24, name: "Sweden",         iq: 99  },
  { rank: 25, name: "Luxembourg",     iq: 99  },
  { rank: 26, name: "Denmark",        iq: 99  },
  { rank: 27, name: "Czech Republic", iq: 99  },
  { rank: 28, name: "Estonia",        iq: 99  },
  { rank: 29, name: "Australia",      iq: 99  },
  { rank: 30, name: "France",         iq: 98  },
];

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