import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import IQCertificate from "@/components/certificate/IQCertificate";

function generateSerial() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function Certificate() {
  const location = useLocation();
  const { name, score } = location.state || {};

  const serialNumber = React.useMemo(() => generateSerial(), []);
  const date = format(new Date(), "MMMM dd, yyyy");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-2xl font-bold text-[#0C3547] mb-8">Your IQ Certificate</h1>
      <div className="overflow-x-auto w-full flex justify-center">
        <IQCertificate
          name={name || "XXXX XXXX"}
          score={score || "XXX"}
          serialNumber={serialNumber}
          date={date}
        />
      </div>
    </div>
  );
}