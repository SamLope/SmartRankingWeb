import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "18px 12px",
        fontSize: "0.9rem",
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: darkMode ? "#1e1f21" : "#f5f5f5",
        color: darkMode ? "#e8eaed" : "#212121",
        borderTop: darkMode ? "1px solid #333" : "1px solid #ddd",
        boxShadow: darkMode
          ? "0 -2px 8px rgba(255,255,255,0.1)"
          : "0 -2px 8px rgba(0,0,0,0.1)",
        letterSpacing: "0.3px",
      }}
    >
      <span
        style={{
          opacity: 0.9,
          transition: "opacity 0.3s ease",
        }}
      >
        © 2025 Smart Ranking — Todos os direitos reservados.
      </span>
    </footer>
  );
}
