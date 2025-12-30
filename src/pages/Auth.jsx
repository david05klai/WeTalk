import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, User, Heart, Sparkles, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

// PANTALLA PRINCIPAL DE AUTH
export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-content">
        <div className="heart-container">
          <div className="heart-glow"></div>
          <Heart className="heart-icon" size={100} strokeWidth={2} />
          <Sparkles className="sparkle sparkle-1" size={20} />
          <Sparkles className="sparkle sparkle-2" size={16} />
          <Sparkles className="sparkle sparkle-3" size={18} />
        </div>
        
        <h1 className="auth-title">Bienvenido a WeTalk</h1>
        <p className="auth-subtitle">
          Conecta con tu pareja y fortalece su relación
        </p>

        <div className="auth-buttons">
          <button className="auth-btn primary-btn" onClick={() => navigate("/login")}>
            <Lock size={22} />
            <span>Iniciar sesión</span>
          </button>

          <button className="auth-btn secondary-btn" onClick={() => navigate("/register")}>
            <User size={22} />
            <span>Crear cuenta</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// LOGIN
export function Login() {
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log('🔵 1. Iniciando login...');
    
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      console.log('🔵 2. Llamando loginWithEmail...');
      await loginWithEmail(email, password);
      
      console.log('🔵 3. Login exitoso, esperando...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('🔵 4. Navegando a /connect...');
      navigate("/connect", { replace: true });
      
      console.log('🔵 5. Navegación completada');
      
    } catch (error) {
      console.error("❌ Error en login:", error);
      if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado");
      } else if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        setError("Contraseña incorrecta");
      } else if (error.code === "auth/invalid-email") {
        setError("Email inválido");
      } else {
        setError("Error al iniciar sesión: " + error.message);
      }
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await loginWithGoogle();
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/connect", { replace: true });
      
    } catch (error) {
      setError("Error al iniciar sesión con Google");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-content">
        <h1 className="auth-title">Iniciar sesión</h1>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-form">
          <div className="input-wrapper">
            <Mail className="input-icon" size={20} />
            <input
              className="auth-input"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-wrapper">
            <Lock className="input-icon" size={20} />
            <input
              className="auth-input"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              disabled={loading}
            />
            <button 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="auth-buttons">
          <button className="auth-btn primary-btn" onClick={handleLogin} disabled={loading}>
            <span>{loading ? "Cargando..." : "Continuar"}</span>
          </button>

          <button className="auth-btn google-btn" onClick={handleGoogleLogin} disabled={loading}>
            <Lock size={20} />
            <span>Continuar con Google</span>
          </button>

          <button className="auth-btn tertiary-btn" onClick={() => navigate("/auth")} disabled={loading}>
            <span>Volver</span>
          </button>
        </div>

        <p className="auth-footer">
          ¿No tienes cuenta?{" "}
          <span className="auth-link" onClick={() => navigate("/register")}>
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
}

// REGISTER
export function Register() {
  const navigate = useNavigate();
  const { registerWithEmail, loginWithGoogle } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
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

    try {
      setLoading(true);
      setError("");
      await registerWithEmail(name, email, password);
      
      alert("¡Cuenta creada exitosamente!");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/connect", { replace: true });
      
    } catch (error) {
      console.error("Error en registro:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("Este email ya está registrado");
      } else if (error.code === "auth/invalid-email") {
        setError("Email inválido");
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña es muy débil");
      } else {
        setError("Error al registrarse: " + error.message);
      }
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await loginWithGoogle();
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/connect", { replace: true });
      
    } catch (error) {
      setError("Error al continuar con Google");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-content">
        <h1 className="auth-title">Crear cuenta</h1>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-form">
          <div className="input-wrapper">
            <User className="input-icon" size={20} />
            <input
              className="auth-input"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-wrapper">
            <Mail className="input-icon" size={20} />
            <input
              className="auth-input"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-wrapper">
            <Lock className="input-icon" size={20} />
            <input
              className="auth-input"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <button 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="input-wrapper">
            <Lock className="input-icon" size={20} />
            <input
              className="auth-input"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleRegister()}
              disabled={loading}
            />
            <button 
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type="button"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="auth-buttons">
          <button className="auth-btn primary-btn" onClick={handleRegister} disabled={loading}>
            <span>{loading ? "Cargando..." : "Continuar"}</span>
          </button>

          <button className="auth-btn google-btn" onClick={handleGoogleLogin} disabled={loading}>
            <Lock size={20} />
            <span>Continuar con Google</span>
          </button>

          <button className="auth-btn tertiary-btn" onClick={() => navigate("/auth")} disabled={loading}>
            <span>Volver</span>
          </button>
        </div>

        <p className="auth-footer">
          ¿Ya tienes cuenta?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}
