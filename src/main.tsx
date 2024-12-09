import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2000,
        style: {
          background: "#333",
          color: "#fff",
          padding: "12px",
          borderRadius: "8px",
        },
      }}
    />
  </StrictMode>
);
