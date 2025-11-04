import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Pesquisa from "./pages/Pesquisa";
import Ranking from "./pages/Ranking";
import Perfil from "./pages/Perfil";
import { isLoggedIn } from "./services/api";

function AppContent() {
  const { darkMode } = useTheme();

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#121212" : "#fafafa",
        color: darkMode ? "#e8eaed" : "#202124",
        fontFamily: "'Roboto', sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.4s ease, color 0.4s ease",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px 15px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            padding: "35px",
            borderRadius: "18px",
            backgroundColor: darkMode ? "#1e1f21" : "#ffffff",
            boxShadow: darkMode
              ? "0 4px 16px rgba(255,255,255,0.05)"
              : "0 4px 16px rgba(0,0,0,0.1)",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/pesquisa" element={isLoggedIn() ? <Pesquisa /> : <Navigate to="/" />} />
            <Route path="/ranking" element={isLoggedIn() ? <Ranking /> : <Navigate to="/" />} />
            <Route path="/perfil" element={isLoggedIn() ? <Perfil /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
