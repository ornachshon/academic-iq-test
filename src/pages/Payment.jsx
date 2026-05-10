import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score;
  const email = location.state?.email || "";

  useEffect(() => {
    navigate("/Info", { state: { score, email }, replace: true });
  }, []);

  return null;
}