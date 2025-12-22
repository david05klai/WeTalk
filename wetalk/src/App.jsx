import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import InstallButton from "./components/InstallButton";

import AppLayout from "./pages/AppLayout";
import HomeApp from "./pages/HomeApp";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import DownloadPage from "./pages/DownloadPage";

// ====== HOME ======
function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="container">
        <img src="/logo.png" alt="WeTalk logo" className="logo" />
        <h1 className="title">WeTalk</h1>

        <div className="buttons">
          <button className="btn primary" onClick={() => navigate("/auth")}>
            Conectar con pareja
          </button>

          <button className="btn omit" onClick={() => navigate("/app/home")}>
            Omitir
          </button>
        </div>
      </div>
    </div>
  );
}

// ====== AUTH ======
function Auth() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Bienvenido a WeTalk</h1>

        <div className="buttons">
          <button className="btn primary" onClick={() => navigate("/login")}>
            Iniciar sesión
          </button>

          <button className="btn omit" onClick={() => navigate("/register")}>
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

// ====== LOGIN ======
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

// ====== REGISTER ======
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
  
  // Mostrar botón en home y dentro de la app
  const showDownloadBtn = location.pathname === '/' || location.pathname.startsWith('/app');

  return (
    <>
      <InstallButton />
      
      {/* BOTÓN FLOTANTE GLOBAL */}
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
            transition: 'all 0.3s ease'
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
          📱 Descargar
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