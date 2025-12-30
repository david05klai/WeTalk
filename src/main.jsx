import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Desregistrar Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let registration of registrations) {
      registration.unregister();
      console.log('🧹 Service Worker desregistrado');
    }
  });
}

// Limpiar caché
if ('caches' in window) {
  caches.keys().then(keys => {
    keys.forEach(key => {
      caches.delete(key);
      console.log('🧹 Caché limpiado:', key);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
