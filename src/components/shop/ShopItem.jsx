import { useData } from "../../Context";
import "./ShopItem.css";

export default function ShopItem({ name, price }) {
  const {
    currentMoney,
    setCurrentMoney,
    setBgTheme,
    bgTheme,
    ownedItems,
    addOwnedItems,
  } = useData();

  const button = () => {
    if (ownedItems.includes(name)) {
      if (bgTheme == name) {
        return (
          <button className="btn equipped" disabled>
            equiped
          </button>
        );
      } else {
        return (
          <button className="btn equip" onClick={() => setBgTheme(name)}>
            equip
          </button>
        );
      }
    } else {
      console.log("bgTheme:", bgTheme);
      return (
        <button
          className="btn buy"
          onClick={() => {
            if (price <= currentMoney) {
              addOwnedItems(name);
              setCurrentMoney((money) => money - price);
            } else alert("You don't have enough money!!");
          }}
        >
          <span className="price">${price}</span> Buy
        </button>
      );
    }
  };

  return (
    <div className="item">
      <div className={`sample ${name}`}></div>
      <p className="discript">{name == "iii" ? "???" : name}</p>
      {button()}
    </div>
  );
}
