import { createRoot } from "react-dom/client";
import ShakeMyHandPage from "./pages/shake-my-hand";
import "./styles/index.css";

const el = document.getElementById("root");
if (!el) throw new Error("Missing #root element");

createRoot(el).render(<ShakeMyHandPage />);



