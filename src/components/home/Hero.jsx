import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { getCountryByCode, defaultCountry } from "./countryData";
import { base44 } from "@/api/base44Client";
import { trackFunnel } from "@/lib/trackFunnel";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [country, setCountry] = useState(defaultCountry);

  useEffect(() => {
    fetch("https://ipapi.co/json/").
    then((res) => res.json()).
    then((data) => {
      setCountry(getCountryByCode(data.country_code));
    }).
    catch(() => {});
  }, []);

  return (
    <section
      className="bg-[#f0f0f0] py-16 md:py-20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cccccc' fill-opacity='0.35'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">{country.flag}</span>
              <span className="text-sm text-gray-600 italic">
                {t("overMillionPeople")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0C3547] leading-tight mb-3">
              {t("averageIQ")}<br />{country.name} {t("averageIQSuffix")} {country.iq}
            </h1>

            <h2 className="text-xl md:text-2xl font-bold text-[#0C3547] mb-7">
              {t("takeTest")}<br />{t("whatIsYourIQ")}
            </h2>

            <Link to={createPageUrl("IQTest")} onClick={() => trackFunnel("start_iq_test_clicked")}>
              <button className="bg-[#F5921B] text-white mb-8 px-10 py-4 text-xl font-bold rounded-md hover:bg-[#e07a0c] transition-colors shadow-sm">
                {t("startIQTest")}
              </button>
            </Link>

            <ul className="space-y-2 text-gray-700 text-sm">
              {[
              t("answer30Questions"),
              t("getFreeScore"),
              t("compareWorldwide"),
              t("detailedReport")].
              map((item) =>
              <li key={item} className="flex items-start gap-2">
                  <span className="text-gray-500 mt-0.5">-</span>
                  <span>{item}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Right image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="https://wwiqtest.com/wp-content/uploads/2021/03/banner-new-min.png"
              alt="IQ Test on devices"
              className="w-full max-w-lg" />

          </div>
        </div>
      </div>
    </section>);

}