import { useNavigate } from 'react-router-dom';

export default function Home() {
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