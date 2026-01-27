import { createRoot } from "react-dom/client";
import ExperienceProjectsPage from "./pages/experience-projects";
import "./styles/index.css";

const el = document.getElementById("root");
if (!el) throw new Error("Missing #root element");

createRoot(el).render(<ExperienceProjectsPage />);

