// ============================================
// SISTEMA DE AUTENTICACIÓN - WeTalk
// Reemplaza las funciones Auth, Login, Register en App.jsx
// ============================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Lock, Mail, User, Heart, Copy, Check } from "lucide-react";

// ============================================
// PANTALLA DE AUTENTICACIÓN
// ============================================
export function Auth() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    return <ConnectPartner />;
  }

  return (
    <div className="page auth-page">
      <div className="auth-container">
        <div className="auth-icon-container">
          <Heart size={64} color="#b84dff" fill="#b84dff" />
        </div>
        
        <h1 className="title">Bienvenido a WeTalk</h1>
        <p className="auth-description">
          Conecta con tu pareja y fortalece su relación 💜
        </p>

        <div className="buttons">
          <button className="btn primary" onClick={() => navigate("/login")}>
            <Lock size={20} />
            Iniciar sesión
          </button>

          <button className="btn omit" onClick={() => navigate("/register")}>
            <User size={20} />
            Crear cuenta
          </button>

          <button className="btn-link" onClick={() => navigate("/app/home")}>
            Continuar sin cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// INICIO DE SESIÓN
// ============================================
export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    // Buscar usuario en localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setError("");
      
      // Si ya tiene pareja, ir directo a la app
      if (user.partnerId) {
        navigate("/app/home");
      } else {
        navigate("/auth"); // Ir a conectar pareja
      }
    } else {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-container">
        <h1 className="title">Iniciar sesión</h1>
        <p className="auth-description">
          Ingresa tus datos para continuar
        </p>

        {error && <div className="error-message">{error}</div>}

        <div className="auth-form">
          <div className="input-group">
            <Mail size={20} color="#888" />
            <input
              className="input"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <Lock size={20} color="#888" />
            <input
              className="input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="buttons">
          <button className="btn primary" onClick={handleLogin}>
            Entrar
          </button>

          <button className="btn secondary" onClick={() => navigate("/auth")}>
            Volver
          </button>
        </div>

        <p className="link-text">
          ¿No tienes cuenta?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
}

// ============================================
// REGISTRO
// ============================================
export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const generateUserId = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  };

  const generatePartnerCode = () => {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleRegister = () => {
    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Verificar si el email ya existe
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === email)) {
      setError("Este email ya está registrado");
      return;
    }

    // Crear nuevo usuario
    const newUser = {
      id: generateUserId(),
      name: name,
      email: email,
      password: password,
      partnerCode: generatePartnerCode(),
      partnerId: null,
      partnerName: null,
      createdAt: new Date().toISOString()
    };

    // Guardar usuario
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setError("");
    alert("✅ Cuenta creada exitosamente!");
    navigate("/auth"); // Ir a conectar pareja
  };

  return (
    <div className="page auth-page">
      <div className="auth-container">
        <h1 className="title">Crear cuenta</h1>
        <p className="auth-description">
          Únete a WeTalk y fortalece tu relación
        </p>

        {error && <div className="error-message">{error}</div>}

        <div className="auth-form">
          <div className="input-group">
            <User size={20} color="#888" />
            <input
              className="input"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <Mail size={20} color="#888" />
            <input
              className="input"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <Lock size={20} color="#888" />
            <input
              className="input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <Lock size={20} color="#888" />
            <input
              className="input"
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="buttons">
          <button className="btn primary" onClick={handleRegister}>
            Crear cuenta
          </button>

          <button className="btn secondary" onClick={() => navigate("/auth")}>
            Volver
          </button>
        </div>

        <p className="link-text">
          ¿Ya tienes cuenta?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}

// ============================================
// CONECTAR CON PAREJA
// ============================================
function ConnectPartner() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [partnerCode, setPartnerCode] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
      
      // Si ya tiene pareja, ir a la app
      if (user.partnerId) {
        navigate("/app/home");
      }
    }
  }, [navigate]);

  const copyCode = () => {
    navigator.clipboard.writeText(currentUser.partnerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const connectWithPartner = () => {
    if (!partnerCode) {
      setError("Por favor ingresa un código");
      return;
    }

    // Buscar pareja por código
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const partner = users.find(u => u.partnerCode === partnerCode.toUpperCase());

    if (!partner) {
      setError("Código inválido. Verifica con tu pareja.");
      return;
    }

    if (partner.id === currentUser.id) {
      setError("No puedes conectarte contigo mismo 😅");
      return;
    }

    if (partner.partnerId) {
      setError("Esta persona ya tiene pareja conectada");
      return;
    }

    // Conectar parejas
    const updatedUsers = users.map(u => {
      if (u.id === currentUser.id) {
        return { ...u, partnerId: partner.id, partnerName: partner.name };
      }
      if (u.id === partner.id) {
        return { ...u, partnerId: currentUser.id, partnerName: currentUser.name };
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    const updatedCurrentUser = updatedUsers.find(u => u.id === currentUser.id);
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

    alert(`💜 ¡Conectado con ${partner.name}!`);
    navigate("/app/home");
  };

  const skipConnection = () => {
    navigate("/app/home");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="page auth-page">
      <div className="auth-container connect-container">
        <div className="auth-icon-container">
          <Users size={64} color="#b84dff" />
        </div>

        <h1 className="title">Conectar con tu pareja</h1>
        <p className="auth-description">
          ¡Hola {currentUser.name}! 👋
        </p>

        {/* TU CÓDIGO */}
        <div className="code-section">
          <h3 className="section-title">Tu código de conexión</h3>
          <p className="section-description">
            Comparte este código con tu pareja
          </p>
          
          <div className="code-display">
            <span className="code-text">{currentUser.partnerCode}</span>
            <button className="copy-btn" onClick={copyCode}>
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        {/* CONECTAR CON CÓDIGO */}
        <div className="code-section">
          <h3 className="section-title">¿Tu pareja ya tiene código?</h3>
          <p className="section-description">
            Ingresa su código para conectarse
          </p>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <input
              className="input code-input"
              type="text"
              placeholder="Código de tu pareja"
              value={partnerCode}
              onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
              maxLength={8}
            />
          </div>

          <button className="btn primary" onClick={connectWithPartner}>
            <Heart size={20} />
            Conectar
          </button>
        </div>

        <button className="btn-link" onClick={skipConnection}>
          Conectar después
        </button>
      </div>
    </div>
  );
}