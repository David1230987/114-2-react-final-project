import ShopItem from "../../components/shop/ShopItem";
import "./BackgroundShop.css"

export default function BackgroundShop() {
    return (
        <div className="shop-contents">
           <ShopItem price={10} name="offwhite" />
            <ShopItem price={10} name="red" />
            <ShopItem price={10} name="gold" />
            <ShopItem price={10} name="dark" />
            <ShopItem price={10} name="sky" />
            <ShopItem price={20} name="purple-black" />
            <ShopItem price={9999} name="iii" />
        </div>
    );
}