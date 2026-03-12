import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const countryData = {
  US: { flag: "🇺🇸", name: "United States", iq: 98 },
  GB: { flag: "🇬🇧", name: "United Kingdom", iq: 100 },
  CA: { flag: "🇨🇦", name: "Canada", iq: 99 },
  AU: { flag: "🇦🇺", name: "Australia", iq: 99 },
  DE: { flag: "🇩🇪", name: "Germany", iq: 102 },
  FR: { flag: "🇫🇷", name: "France", iq: 98 },
  IN: { flag: "🇮🇳", name: "India", iq: 82 },
  CN: { flag: "🇨🇳", name: "China", iq: 105 },
  JP: { flag: "🇯🇵", name: "Japan", iq: 106 },
  KR: { flag: "🇰🇷", name: "South Korea", iq: 106 },
  BR: { flag: "🇧🇷", name: "Brazil", iq: 87 },
  MX: { flag: "🇲🇽", name: "Mexico", iq: 88 },
  IL: { flag: "🇮🇱", name: "Israel", iq: 95 },
  NL: { flag: "🇳🇱", name: "Netherlands", iq: 102 },
  SE: { flag: "🇸🇪", name: "Sweden", iq: 101 },
  NO: { flag: "🇳🇴", name: "Norway", iq: 100 },
  FI: { flag: "🇫🇮", name: "Finland", iq: 101 },
  IT: { flag: "🇮🇹", name: "Italy", iq: 96 },
  ES: { flag: "🇪🇸", name: "Spain", iq: 97 },
  PL: { flag: "🇵🇱", name: "Poland", iq: 99 },
};

export default function Hero() {
  const [country, setCountry] = useState({ flag: "🇺🇸", name: "United States", iq: 98 });

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const code = data.country_code;
        if (code && countryData[code]) {
          setCountry(countryData[code]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      className="bg-[#f0f0f0] py-16 md:py-20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cccccc' fill-opacity='0.35'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">{country.flag}</span>
              <span className="text-sm text-gray-600 italic">
                Over 8 million people have taken this test
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0C3547] leading-tight mb-3">
              The average IQ in<br />{country.name} is {country.iq}
            </h1>

            <h2 className="text-xl md:text-2xl font-bold text-[#0C3547] mb-7">
              Take this IQ test and check<br />what is your IQ
            </h2>

            <Link to={createPageUrl("IQTest")}>
              <button className="bg-[#F5921B] hover:bg-[#e07a0c] text-white font-extrabold text-xl px-10 py-4 rounded-md transition-colors mb-8 shadow-sm">
                Start IQ Test
              </button>
            </Link>

            <ul className="space-y-2 text-gray-700 text-sm">
              {[
                "Answer 30 questions",
                "Get your IQ score instantly for free",
                "See how you compare to people worldwide",
                "Detailed cognitive performance report",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gray-500 mt-0.5">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="https://wwiqtest.com/wp-content/uploads/2021/03/banner-new-min.png"
              alt="IQ Test on devices"
              className="w-full max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}