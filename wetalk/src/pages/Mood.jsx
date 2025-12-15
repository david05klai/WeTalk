import "../App.css";

export default function Mood() {
  const moods = [
    { emoji: "😊", text: "Feliz", msg: "Aprovecha este mood y comparte algo bonito 💛" },
    { emoji: "😐", text: "Normal", msg: "Todo tranquilo también está bien 🌱" },
    { emoji: "😔", text: "Triste", msg: "Está bien no estar bien, respira 💙" },
    { emoji: "😡", text: "Molesto", msg: "Antes de reaccionar, date un respiro 🫶" },
  ];

  const handleMood = (msg) => {
    alert(msg);
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">¿Cómo te sientes hoy?</h1>

        <div className="moods">
          {moods.map((mood) => (
            <button
              key={mood.text}
              className="mood-btn"
              onClick={() => handleMood(mood.msg)}
            >
              <span>{mood.emoji}</span>
              {mood.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
