import { Link, NavLink } from "react-router";
import { useData } from "../Context";
import "./SiteNav.css"

export default function SiteHeader() {
  const { isGambling } = useData();
  //console.log(isGambling);

  if (isGambling) {
    return (
      <nav className="site-nav">

        <div className="nav-item locked">
          <p>Casino 🔒</p>
        </div>

        <div className="nav-item locked">
          <p>Shop 🔒</p>
        </div>

      </nav>
    );
  }

  return (
    <nav className="site-nav">
      <NavLink to="/casino" className="nav-item">Casino</NavLink>
      <NavLink to="/shop/background" className="nav-item">Shop</NavLink>
    </nav>
  );
}
