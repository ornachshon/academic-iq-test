export const countries = [
  { rank: 1,  code: "SG", flag: "🇸🇬", name: "Singapore",       iq: 108 },
  { rank: 2,  code: "HK", flag: "🇭🇰", name: "Hong Kong",        iq: 108 },
  { rank: 3,  code: "TW", flag: "🇹🇼", name: "Taiwan",           iq: 106 },
  { rank: 4,  code: "KR", flag: "🇰🇷", name: "South Korea",      iq: 106 },
  { rank: 5,  code: "JP", flag: "🇯🇵", name: "Japan",            iq: 105 },
  { rank: 6,  code: "CN", flag: "🇨🇳", name: "China",            iq: 104 },
  { rank: 7,  code: "SI", flag: "🇸🇮", name: "Slovenia",         iq: 103 },
  { rank: 8,  code: "CH", flag: "🇨🇭", name: "Switzerland",      iq: 102 },
  { rank: 9,  code: "NL", flag: "🇳🇱", name: "Netherlands",      iq: 102 },
  { rank: 10, code: "KP", flag: "🇰🇵", name: "North Korea",      iq: 102 },
  { rank: 11, code: "MO", flag: "🇲🇴", name: "Macao",            iq: 101 },
  { rank: 12, code: "IS", flag: "🇮🇸", name: "Iceland",          iq: 101 },
  { rank: 13, code: "FI", flag: "🇫🇮", name: "Finland",          iq: 101 },
  { rank: 14, code: "CA", flag: "🇨🇦", name: "Canada",           iq: 101 },
  { rank: 15, code: "BE", flag: "🇧🇪", name: "Belgium",          iq: 100 },
  { rank: 16, code: "DE", flag: "🇩🇪", name: "Germany",          iq: 100 },
  { rank: 17, code: "GB", flag: "🇬🇧", name: "United Kingdom",   iq: 100 },
  { rank: 18, code: "AT", flag: "🇦🇹", name: "Austria",          iq: 100 },
  { rank: 19, code: "NZ", flag: "🇳🇿", name: "New Zealand",      iq: 100 },
  { rank: 20, code: "IL", flag: "🇮🇱", name: "Israel",           iq: 100 },
  { rank: 21, code: "MT", flag: "🇲🇹", name: "Malta",            iq: 99  },
  { rank: 22, code: "SK", flag: "🇸🇰", name: "Slovakia",         iq: 99  },
  { rank: 23, code: "NO", flag: "🇳🇴", name: "Norway",           iq: 99  },
  { rank: 24, code: "SE", flag: "🇸🇪", name: "Sweden",           iq: 99  },
  { rank: 25, code: "LU", flag: "🇱🇺", name: "Luxembourg",       iq: 99  },
  { rank: 26, code: "DK", flag: "🇩🇰", name: "Denmark",          iq: 99  },
  { rank: 27, code: "CZ", flag: "🇨🇿", name: "Czech Republic",   iq: 99  },
  { rank: 28, code: "EE", flag: "🇪🇪", name: "Estonia",          iq: 99  },
  { rank: 29, code: "AU", flag: "🇦🇺", name: "Australia",        iq: 99  },
  { rank: 30, code: "FR", flag: "🇫🇷", name: "France",           iq: 98  },
];

// Lookup by country code, fallback to US
export const defaultCountry = { flag: "🇺🇸", name: "United States", iq: 98 };

export function getCountryByCode(code) {
  return countries.find((c) => c.code === code) || defaultCountry;
}