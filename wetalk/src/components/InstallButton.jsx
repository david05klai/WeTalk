// ============================================
// InstallButton.jsx - Botón para instalar la PWA
// Crea este archivo en: src/components/InstallButton.jsx
// ============================================

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Verificar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstall(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('✅ Usuario instaló la app');
    } else {
      console.log('❌ Usuario canceló la instalación');
    }

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  if (!showInstall) return null;

  return (
    <button 
      className="install-button"
      onClick={handleInstall}
    >
      <Download size={20} />
      <span>Instalar App</span>
    </button>
  );
}

// ============================================
// ESTILOS - Agregar al final de App.css
// ============================================
/*
.install-button {
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #7f00ff, #b84dff);
  color: white;
  border: none;
  border-radius: 999px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(127, 0, 255, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  animation: slideInDown 0.5s ease;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.install-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(127, 0, 255, 0.6);
}

.install-button:active {
  transform: scale(0.95);
}
*/