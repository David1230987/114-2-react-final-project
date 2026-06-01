import { useRef, useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router";
import { useData } from "./Context.jsx";
import "./App.css";
import TimerDisplayer from "./components/casino/TimerDisplay.jsx";
import Home from "./pages/Home.jsx";
import CasinoLayout from "./pages/CasinoLayout.jsx";
import Lobby from "./pages/casino/Lobby.jsx";
import ShopLayout from "./pages/ShopLayout.jsx";
import BlackJack from "./pages/casino/BlackJack.jsx";
import SlotMachine from "./pages/casino/SlotMachine.jsx";
import BackgroundShop from "./pages/shop/BackgroundShop.jsx";
import CardShop from "./pages/shop/CardShop.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const {currentMoney, bgTheme, isGambling} = useData();

  if(currentMoney == -1){
    window.location.href = 'https://www.google.com';
  }
  return (
  
      <div className={`main ${bgTheme}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/casino" element={<CasinoLayout />}>
            <Route index element={<Lobby />} />
            <Route path="blackjack" element={<BlackJack />} />
            <Route path="slot-machine" element={<SlotMachine />} />
          </Route>
          <Route path="/shop" element={<ShopLayout />}>
            <Route index element={null} />
            <Route path="background" element={<BackgroundShop />} />
            <Route path="card" element={<CardShop />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

  );
}
