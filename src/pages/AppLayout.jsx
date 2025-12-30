import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, MessageCircle, Settings } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import "./AppLayout.css";

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile } = useAuth();

  const isActive = (path) => location.pathname === path;

  // Proteger contra retroceso
  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault();
      window.history.pushState(null, null, window.location.pathname);
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!userProfile) {
      navigate('/auth', { replace: true });
    }
  }, [userProfile, navigate]);

  return (
    <div className="app-layout">
      <div className="app-content">
        <Outlet />
      </div>

      <div className="bottom-bar">
        <button 
          className={isActive('/app/home') ? 'active' : ''}
          onClick={() => navigate("/app/home")}
        >
          <Home size={26} strokeWidth={isActive('/app/home') ? 2.5 : 2} />
        </button>

        <button 
          className={isActive('/app/chat') ? 'active' : ''}
          onClick={() => navigate("/app/chat")}
        >
          <MessageCircle size={26} strokeWidth={isActive('/app/chat') ? 2.5 : 2} />
        </button>

        <button 
          className={isActive('/app/settings') ? 'active' : ''}
          onClick={() => navigate("/app/settings")}
        >
          <Settings size={26} strokeWidth={isActive('/app/settings') ? 2.5 : 2} />
        </button>
      </div>
    </div>
  );
}
