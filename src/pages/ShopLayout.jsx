import { NavLink, Outlet } from "react-router";
import { useData } from "../Context";
import SiteHeader from "../components/SiteNav";
import MoneyDisplay from "../components/MoneyDisplay";
import "./ShopLayout.css";

export default function DashboardLayout() {
  const { currentMoney, bgTheme } = useData();
  return (
    <div className="shop">
      <h2 className={`shop-title ${bgTheme}`}>SHOP</h2>
      <SiteHeader></SiteHeader>

      <div className="main-box">

        <div className="data">
          <MoneyDisplay currentMoney={currentMoney}></MoneyDisplay>
        </div>

        <nav className="shop-nav">
          <NavLink className="shop-link" to="/shop/background">
            Background
          </NavLink>
          <NavLink className="shop-link" to="/shop/card">
            Card
          </NavLink>
        </nav>

        <div className="shop-content">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
