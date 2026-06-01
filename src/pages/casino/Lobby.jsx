import { Link } from "react-router";
import "./Lobby.css";
import { useData } from "../../Context";

export default function Lobby() {
  const { setIsGambling, setCurrentMoney } = useData();
  return (
    <div className="lobby">
      <div className="lobby-card">
        <h1 className="lobby-title">CASINO LOBBY</h1>
        <p className="lobby-subtitle">Welcome to the casino!</p>
        
        <Link
          to="/casino/blackjack"
          className="enter-button"
          onClick={() => {
            setIsGambling(true);
            setCurrentMoney((money) => money - 100);
          }}
        >
          Enter Casino <span className="ticket-price">$100</span>
        </Link>
      </div>
    
    </div>
  );
}
