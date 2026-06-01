import { NavLink, Outlet } from "react-router";
import { useData } from "../Context";
import SiteHeader from "../components/SiteNav";
import TimerDisplay from "../components/casino/TimerDisplay";
import MoneyDisplay from "../components/MoneyDisplay";
import "./CasinoLayout.css";

export default function CasinoLayout() {
  const { currentMoney, isGambling, bgTheme } = useData();

  return (
    <div className="casino">
      <h2 className={`casino-title ${bgTheme}`}>CASINO</h2>

      <SiteHeader></SiteHeader>

      <div className="main-box">

        <div className="data">
          <MoneyDisplay currentMoney={currentMoney}></MoneyDisplay>
          <TimerDisplay />
        </div>

        {isGambling && (
          <nav className="casino-nav">
            <NavLink to="/casino/blackjack" className="casino-link">
              Black Jack
            </NavLink>
            <NavLink to="/casino/slot-machine" className="casino-link">
              Slot Machine
            </NavLink>
          </nav>
        )}
        <Outlet />

      </div>
    </div>
  );
}
