import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { trackFunnel } from "@/lib/trackFunnel";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score;
  const email = location.state?.email || "";

  useEffect(() => {
    trackFunnel("payment_completed");
    navigate("/Info", { state: { score, email }, replace: true });
  }, []);

  return null;
}