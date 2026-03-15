import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download } from "lucide-react";

export default function IQCertificate({ name, score, serialNumber, date }) {
  const certRef = useRef(null);

  const displayName = name || "XXXX XXXX";
  const displayScore = score || "XXX";
  const displaySerial = serialNumber || "XXXXXXXX";
  const displayDate = date || "Month, Day, Year";

  const handleDownload = async () => {
    const el = certRef.current;
    const canvas = await html2canvas(el, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width / 2, canvas.height / 2] });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`IQ_Certificate_${displaySerial}.pdf`);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Certificate */}
      <div
        ref={certRef}
        style={{
          width: "850px",
          height: "600px",
          background: "#faf7f0",
          position: "relative",
          fontFamily: "Georgia, serif",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Outer gold border */}
        <div style={{
          position: "absolute", inset: "14px",
          border: "2px solid #b8972e",
          pointerEvents: "none",
          zIndex: 1,
        }} />

        {/* Corner ornaments (L-shaped gold brackets) */}
        {/* Top-left */}
        <div style={{ position: "absolute", top: "6px", left: "6px", width: "28px", height: "28px", borderTop: "4px solid #b8972e", borderLeft: "4px solid #b8972e", zIndex: 2 }} />
        {/* Top-right */}
        <div style={{ position: "absolute", top: "6px", right: "6px", width: "28px", height: "28px", borderTop: "4px solid #b8972e", borderRight: "4px solid #b8972e", zIndex: 2 }} />
        {/* Bottom-left */}
        <div style={{ position: "absolute", bottom: "6px", left: "6px", width: "28px", height: "28px", borderBottom: "4px solid #b8972e", borderLeft: "4px solid #b8972e", zIndex: 2 }} />
        {/* Bottom-right */}
        <div style={{ position: "absolute", bottom: "6px", right: "6px", width: "28px", height: "28px", borderBottom: "4px solid #b8972e", borderRight: "4px solid #b8972e", zIndex: 2 }} />

        {/* Logo absolutely positioned top-left */}
        <div style={{
          position: "absolute", top: "36px", left: "60px",
          width: "88px", height: "88px",
          borderRadius: "50%",
          border: "2px solid #1a3a4a",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "#faf7f0",
          zIndex: 4,
        }}>
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg"
            alt="AIQ"
            style={{ width: "48px", height: "48px", objectFit: "contain" }}
            crossOrigin="anonymous"
          />
        </div>

        {/* Content area - fully centered */}
        <div style={{ padding: "60px 70px 30px 70px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", position: "relative", zIndex: 3 }}>

          {/* Title block - truly full width centered */}
          <div style={{ width: "100%", textAlign: "center", marginTop: "16px" }}>
            <div style={{ fontSize: "13px", color: "#444", letterSpacing: "3px", fontFamily: "Arial, sans-serif", textTransform: "uppercase", marginBottom: "4px" }}>
              Academic IQ Test
            </div>
            <div style={{ fontSize: "62px", fontWeight: "900", color: "#1a1a1a", letterSpacing: "4px", lineHeight: 1, fontFamily: "Georgia, serif", textTransform: "uppercase" }}>
              CERTIFICATE
            </div>
            <div style={{ fontSize: "15px", color: "#444", fontFamily: "Georgia, serif", marginTop: "10px", fontStyle: "italic" }}>
              awarded to
            </div>
          </div>

          {/* Name - full width centered */}
          <div style={{ width: "100%", textAlign: "center", marginTop: "8px" }}>
            <div style={{ fontSize: "42px", color: "#b8972e", fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: "normal", letterSpacing: "1px" }}>
              {displayName}
            </div>
          </div>

          {/* Recognition text */}
          <div style={{ width: "100%", textAlign: "center", marginTop: "16px", color: "#333", fontSize: "14px", fontFamily: "Georgia, serif", lineHeight: "1.7", fontStyle: "italic" }}>
            in recognition of successful completion of the<br />
            Academic IQ Test with a score of:
          </div>

          {/* Score row - centered */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "16px", position: "relative" }}>
            <div style={{ width: "160px", height: "1px", background: "#b8972e" }} />
            <div style={{ fontSize: "58px", fontWeight: "bold", color: "#1a1a1a", fontFamily: "Georgia, serif", lineHeight: 1, padding: "0 24px" }}>
              {displayScore}
            </div>
            <div style={{ width: "160px", height: "1px", background: "#b8972e" }} />

            {/* Watermark stamp */}
            <div style={{
              position: "absolute", right: "0px", top: "-10px",
              width: "85px", height: "85px", borderRadius: "50%",
              border: "2px solid #aaa", opacity: 0.3,
              display: "flex", alignItems: "center", justifyContent: "center",
              textAlign: "center", color: "#555", fontSize: "10px", fontWeight: "bold",
              fontFamily: "Arial, sans-serif", lineHeight: "1.4", letterSpacing: "1px",
              textTransform: "uppercase",
            }}>
              ACADEMIC<br />IQ TEST
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ fontSize: "11px", color: "#555", fontFamily: "Arial, sans-serif" }}>
              Certificate Serial Number: &nbsp;<strong>#{displaySerial}</strong>
            </div>
            <div style={{ fontSize: "11px", color: "#555", fontFamily: "Arial, sans-serif" }}>
              Date: &nbsp;<strong>{displayDate}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 bg-[#F5921B] text-white font-bold px-6 py-3 rounded-md hover:bg-[#e0830f] transition-colors"
      >
        <Download className="w-4 h-4" />
        Download Certificate (PDF)
      </button>
    </div>
  );
}