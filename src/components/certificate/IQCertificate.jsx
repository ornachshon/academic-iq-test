import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download } from "lucide-react";

export default function IQCertificate({ name, score, serialNumber, date }) {
  const certRef = useRef(null);

  const displayName = name || "XXXX XXXX";
  const displayScore = score || "XXX";
  const displaySerial = serialNumber || "XXXXXXXX";
  const displayDate = date || "XXXX XXXX";

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
          width: "820px",
          height: "580px",
          background: "#fdfaf3",
          position: "relative",
          fontFamily: "Georgia, serif",
          overflow: "hidden",
        }}
      >
        {/* Diagonal watermark lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1={i * 40 - 200} y1="0" x2={i * 40 + 400} y2="580" stroke="#888" strokeWidth="1" />
          ))}
        </svg>

        {/* Outer gold border */}
        <div style={{
          position: "absolute", inset: "12px",
          border: "2px solid #c9a84c",
          pointerEvents: "none",
        }} />
        {/* Inner thin border */}
        <div style={{
          position: "absolute", inset: "20px",
          border: "1px solid #c9a84c",
          pointerEvents: "none",
        }} />

        {/* Corner dots */}
        {[
          { top: "8px", left: "8px" },
          { top: "8px", right: "8px" },
          { bottom: "8px", left: "8px" },
          { bottom: "8px", right: "8px" },
        ].map((pos, i) => (
          <div key={i} style={{
            position: "absolute", ...pos,
            width: "10px", height: "10px",
            borderRadius: "50%",
            background: "#c9a84c",
          }} />
        ))}

        {/* Content area */}
        <div style={{ padding: "36px 60px 28px 60px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>

          {/* Top row: logo + title */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
            {/* Logo */}
            <div style={{ flexShrink: 0, textAlign: "center" }}>
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg"
                alt="Academic IQ Test"
                style={{ width: "60px", height: "60px", objectFit: "contain" }}
                crossOrigin="anonymous"
              />
              <div style={{ fontSize: "9px", color: "#1a3a4a", fontWeight: "bold", marginTop: "2px", fontFamily: "Arial, sans-serif", letterSpacing: "0.5px" }}>
                ACADEMIC<br />IQ TEST
              </div>
            </div>

            {/* Title block */}
            <div style={{ flex: 1, textAlign: "center", paddingTop: "4px" }}>
              <div style={{ fontSize: "13px", color: "#444", letterSpacing: "2px", fontFamily: "Arial, sans-serif", marginBottom: "2px" }}>
                Academic IQ Test
              </div>
              <div style={{ fontSize: "52px", fontWeight: "bold", color: "#1a3a4a", letterSpacing: "6px", lineHeight: 1, fontFamily: "Georgia, serif", textTransform: "uppercase" }}>
                CERTIFICATE
              </div>
              <div style={{ fontSize: "14px", color: "#555", fontFamily: "Arial, sans-serif", marginTop: "6px", fontStyle: "italic" }}>
                awarded to
              </div>
            </div>
          </div>

          {/* Name */}
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <div style={{ fontSize: "38px", color: "#c9a84c", fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: "normal" }}>
              {displayName}
            </div>
          </div>

          {/* Recognition text */}
          <div style={{ textAlign: "center", marginTop: "14px", color: "#444", fontSize: "13.5px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
            in recognition of successful completion of the<br />
            Academic IQ Test with a score of:
          </div>

          {/* Score row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px", position: "relative" }}>
            <div style={{ flex: 1, height: "1px", background: "#c9a84c", margin: "0 30px 0 0", maxWidth: "140px", marginLeft: "auto" }} />
            <div style={{ fontSize: "52px", fontWeight: "bold", color: "#1a3a4a", fontFamily: "Georgia, serif", lineHeight: 1, padding: "0 20px" }}>
              {displayScore}
            </div>
            <div style={{ flex: 1, height: "1px", background: "#c9a84c", margin: "0 0 0 30px", maxWidth: "140px" }} />

            {/* Watermark stamp */}
            <div style={{
              position: "absolute", right: "30px", bottom: "-20px",
              width: "80px", height: "80px", borderRadius: "50%",
              border: "2px solid #bbb", opacity: 0.25,
              display: "flex", alignItems: "center", justifyContent: "center",
              textAlign: "center", color: "#555", fontSize: "9px", fontWeight: "bold",
              fontFamily: "Arial, sans-serif", lineHeight: "1.3", letterSpacing: "0.5px"
            }}>
              Academic<br />IQ<br />Test
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "16px", borderTop: "1px solid #ddd" }}>
            <div style={{ fontSize: "11px", color: "#555", fontFamily: "Arial, sans-serif" }}>
              Certificate Serial Number: <strong>#{displaySerial}</strong>
            </div>
            <div style={{ fontSize: "11px", color: "#555", fontFamily: "Arial, sans-serif" }}>
              Date: <strong>{displayDate}</strong>
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