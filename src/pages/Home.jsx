import { Link } from "react-router";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h1 className="welcome-title">WELCOME</h1>
        
        <Link to="/casino" className="entry-btn">
          ENTER THE CASINO
        </Link>
      </div>
    </div>
  );
}
