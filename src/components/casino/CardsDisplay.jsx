import "./CardsDisplay.css";

export default function CardsDisplay({cards, total, name}) {
  return (
    <div className="cards">
      <div className="point">
        <h3>{name}</h3>
        <p>{total}</p>
      </div>
      {cards.map((cardValue, index) => (
        <img
          key={index}
          src={`/img/poker/${cardValue}.png`}
          alt={`${cardValue} point`}
        />
      ))}
    </div>
  );
}
