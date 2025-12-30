import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Auth, { Login, Register } from './pages/Auth';
import ConnectPartner from './pages/ConnectPartner';
import AppLayout from './pages/AppLayout';
import HomeApp from './pages/HomeApp';
import Chat from './pages/Chat';
import Challenges from './pages/Challenges';
import SOSMode from './pages/SOSMode';
import Settings from './pages/Settings';

// Componente para proteger rutas (requiere login)
function ProtectedRoute({ children }) {
  const { userProfile } = useAuth();
  
  if (!userProfile) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
}

// Componente para rutas que requieren pareja
function CoupleRequired({ children }) {
  const { userProfile } = useAuth();
  
  if (!userProfile) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!userProfile.partnerId) {
    return <Navigate to="/connect" replace />;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Ruta de conexión - requiere login pero no pareja */}
      <Route 
        path="/connect" 
        element={
          <ProtectedRoute>
            <ConnectPartner />
          </ProtectedRoute>
        } 
      />
      
      {/* Rutas de la app */}
      <Route 
        path="/app" 
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* 🔥 CAMBIO: Home YA NO requiere pareja */}
        <Route 
          path="home" 
          element={<HomeApp />}
        />
        
        <Route 
          path="chat" 
          element={
            <CoupleRequired>
              <Chat />
            </CoupleRequired>
          } 
        />
        
        <Route 
          path="challenges" 
          element={
            <CoupleRequired>
              <Challenges />
            </CoupleRequired>
          } 
        />
        
        <Route path="sos" element={<SOSMode />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Redirigir rutas inválidas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
