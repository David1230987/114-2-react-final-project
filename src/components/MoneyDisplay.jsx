import "./MoneyDisplay.css";

export default function MoneyDisplay({currentMoney}) {
  return (
    <div className="money">
      <p>
        Current Money: <span className="money-highlight">${currentMoney}</span>
      </p>
    </div>
  );
}
