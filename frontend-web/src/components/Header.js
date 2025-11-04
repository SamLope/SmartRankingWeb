import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon, FiLogOut, FiMenu, FiX, FiUser } from "react-icons/fi";
import { logout, isLoggedIn } from "../services/api";
import { getUserFromToken } from "../utils/auth";

export default function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUserFromToken();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const pageColors = {
    "/": "#1976d2",
    "/cadastro": "#2e7d32",
    "/pesquisa": "#fbc02d",
    "/ranking": "#d32f2f",
    "/perfil": "#bdbdbd",
  };

  const headerColor = pageColors[location.pathname] || "#202124";
  const sidebarColor = darkenColor(headerColor, 0.25);

  return (
    <>
      {/* HEADER PRINCIPAL */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
          backgroundColor: headerColor,
          color: darkMode ? "#fff" : "#000",
          fontFamily: "'Roboto', sans-serif",
          boxShadow: darkMode
            ? "0 3px 10px rgba(0,0,0,0.6)"
            : "0 3px 10px rgba(0,0,0,0.15)",
          transition: "background 0.3s ease, color 0.3s ease",
        }}
      >
        {/* Botão sanduíche à esquerda */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            zIndex: 1100,
            fontSize: "2.8rem",
          }}
          title="Menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* LOGO CENTRALIZADO */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "-65px",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <img
            src="/LogoSR.png"
            alt="SmartRanking Logo"
            style={{
              width: "950px",
              height: "auto",
              pointerEvents: "none",
              filter: darkMode
                ? "drop-shadow(0 2px 6px rgba(255,255,255,0.4))"
                : "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
              transition: "filter 0.3s ease",
            }}
          />
        </div>

        {/* Botão de tema à direita */}
        <button
          onClick={toggleTheme}
          style={themeButtonStyle}
          title="Alternar tema"
        >
          {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>
      </header>

      {/* OVERLAY ESCURECIDO AO ABRIR MENU */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            top: "150px",
            left: 0,
            width: "100vw",
            height: "calc(100vh - 150px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 900,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* MENU LATERAL DESLIZANTE */}
      <div
        style={{
          position: "fixed",
          top: "150px",
          left: 0,
          height: "calc(100vh - 150px)",
          width: "280px",
          backgroundColor: sidebarColor,
          color: darkMode ? "#fff" : "#fff",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s ease",
          boxShadow: menuOpen ? "4px 0 10px rgba(0,0,0,0.3)" : "none",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "25px 20px",
          borderTopRightRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        {/* Links de navegação */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.3s ease",
            marginTop: "10px",
          }}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            style={navLink(location.pathname === "/")}
          >
            Login
          </Link>
          <Link
            to="/cadastro"
            onClick={() => setMenuOpen(false)}
            style={navLink(location.pathname === "/cadastro")}
          >
            Cadastro
          </Link>
          <Link
            to="/pesquisa"
            onClick={() => setMenuOpen(false)}
            style={navLink(location.pathname === "/pesquisa")}
          >
            Pesquisa
          </Link>
          <Link
            to="/ranking"
            onClick={() => setMenuOpen(false)}
            style={navLink(location.pathname === "/ranking")}
          >
            Ranking
          </Link>
          <Link
            to="/perfil"
            onClick={() => setMenuOpen(false)}
            style={navLink(location.pathname === "/perfil")}
          >
            Perfil
          </Link>
        </nav>

        {/* Seção inferior: nome do usuário e botão logout */}
        {isLoggedIn() && user && (
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.5)",
              paddingTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              opacity: menuOpen ? 1 : 0,
              transition: "opacity 0.3s ease",
              marginBottom: "70px", // leve afastamento do fundo
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <FiUser size={30} />
              <span style={{ fontWeight: "600", fontSize: "1rem" }}>
                {user.nome || user.email}
              </span>
            </div>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              style={{
                background: darkMode ? "#ffffff22" : "#e3f2fd",
                border: "none",
                color: darkMode ? "#fff" : "#1976d2",
                cursor: "pointer",
                padding: "18px 12px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "background 0.3s ease, transform 0.2s ease",
              }}
            >
              <FiLogOut />
              Sair
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* --- Funções auxiliares --- */
function darkenColor(hex, amount) {
  try {
    let c = hex.replace("#", "");
    const num = parseInt(c, 16);
    let r = (num >> 16) - 255 * amount;
    let g = ((num >> 8) & 0x00ff) - 255 * amount;
    let b = (num & 0x0000ff) - 255 * amount;
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    return `rgb(${r},${g},${b})`;
  } catch {
    return "#202020";
  }
}

const navLink = (active) => ({
  textDecoration: "none",
  color: "inherit",
  fontSize: "1.15rem",
  fontWeight: 500,
  opacity: active ? 1 : 0.85,
  borderBottom: active ? "2px solid currentColor" : "2px solid transparent",
  paddingBottom: "3px",
  transition: "all 0.25s ease",
  cursor: "pointer",
});

const themeButtonStyle = {
  background: "transparent",
  border: "none",
  color: "inherit",
  cursor: "pointer",
  transition: "transform 0.25s ease",
};
