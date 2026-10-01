import { createRoot, hydrateRoot } from "react-dom/client";
import Home from "./App";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing application root");
if (root.querySelector("main")) {
  hydrateRoot(root, <Home/>);
} else {
  createRoot(root).render(<Home/>);
}
