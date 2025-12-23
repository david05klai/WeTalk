import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import InstallButton from "./components/InstallButton";
import InstallPWA from "./components/InstallPWA";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AppLayout from "./pages/AppLayout";
import HomeApp from "./pages/HomeApp";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import DownloadPage from "./pages/DownloadPage";

// ====== LOGIN (Temporal) ======
function Login() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">En desarrollo</h1>
        <p className="text">
          Esta función todavía está en trabajo.  
          Pronto funcionará 😉
        </p>

        <button className="btn primary" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>
  );
}

// ====== REGISTER (Temporal) ======
function Register() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Crear cuenta</h1>

        <input className="input" placeholder="Correo electrónico" />
        <input className="input" type="password" placeholder="Contraseña" />

        <button className="btn primary" onClick={() => navigate("/app/home")}>
          Continuar
        </button>
      </div>
    </div>
  );
}

// ====== APP PRINCIPAL ======
export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mostrar botón flotante en home y dentro de la app (pero NO en /download)
  const showDownloadBtn = (location.pathname === '/' || location.pathname.startsWith('/app')) && location.pathname !== '/download';

  return (
    <>
      <InstallButton />
      <InstallPWA />
      
      {/* BOTÓN FLOTANTE GLOBAL DE DESCARGA */}
      {showDownloadBtn && (
        <button 
          onClick={() => navigate("/download")}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'linear-gradient(135deg, #7f00ff, #b84dff)',
            color: 'white',
            border: 'none',
            borderRadius: '999px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(127, 0, 255, 0.4)',
            zIndex: 9999,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(127, 0, 255, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(127, 0, 255, 0.4)';
          }}
        >
          📱 <span>Descargar</span>
        </button>
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/download" element={<DownloadPage />} />

        <Route path="/app" element={<AppLayout />}>
          <Route path="home" element={<HomeApp />} />
          <Route path="chat" element={<Chat />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}