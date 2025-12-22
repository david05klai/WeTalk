import "./WeTalkLogo.css";

export default function WeTalkLogo() {
  return (
    <div className="logo-container">
      <svg
        width="200"
        height="180"
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
      >
        <path
          d="
            M100 160
            V60
            C100 20 40 20 40 70
            C40 110 100 120 100 160
            C100 120 160 110 160 70
            C160 20 100 20 100 60
          "
          className="logo-path"
        />
      </svg>

      <h1 className="logo-text">WeTalk</h1>
    </div>
  );
}
