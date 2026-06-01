import { useState, useEffect } from "react";
import { useData } from "../../Context";
import CardsDisplay from "../../components/casino/CardsDisplay";
import "./BlackJack.css";

export default function BlackJack() {
  const [playerCards, setPlayerCards] = useState([]);
  const [botCards, setBotCards] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [botTotal, setBotTotal] = useState(0);
  const [isBet, setIsBet] = useState(false);
  const [isBotActing, setIsBotActing] = useState(false);
  const [betMoney, setBetMoney] = useState(0);
  const [lose, setLose] = useState(false);
  const [win, setWin] = useState(false);
  const [draw, setDraw] = useState(false);
  const { currentMoney, setCurrentMoney } = useData();

  if (betMoney > currentMoney) setBetMoney(currentMoney);
  if (betMoney < 10 && currentMoney >= 10) setBetMoney(10);
  if (currentMoney <= 0 && !isBet) setCurrentMoney(-1);
  if (isBet && playerTotal > 21) {
    setLose(true);
    setIsBet(false);
  }

  function AddPlayerCard() {
    const point = Math.floor(Math.random() * 13) + 1;

    setPlayerCards((cards) => {
      const nextCards = [...cards, point];
      setPlayerTotal(ComputePoint(nextCards));
      return nextCards;
    });
  }

  function AddBotCard(currentList = []) {
    const point = Math.floor(Math.random() * 13) + 1;
    setBotCards((cards) => {
      const nextCards = [...cards, point];
      setBotTotal(ComputePoint(nextCards));
      return nextCards;
    });
    const nextList = [...currentList, point];
    return nextList;
  }

  function ComputePoint(cards) {
    let total = 0;
    let hasOne = false;
    cards.forEach((p) => {
      if (p == 1) {
        total += p;
        hasOne = true;
      } else if (p < 10) {
        total += p;
      } else {
        total += 10;
      }
    });
    if (hasOne && total <= 11) {
      total += 10;
    }
    return total;
  }

  function Start() {
    setPlayerCards([]);
    setBotCards([]);
    setWin(false);
    setDraw(false);
    setLose(false);
    AddPlayerCard();
    AddPlayerCard();
    AddBotCard();
    AddBotCard();
  }

  async function BotAct() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let tempBotCards = botCards;
    let currentBotTotal = botTotal;

    setIsBotActing(true);
    while (currentBotTotal < playerTotal) {
      await delay(1000);
      tempBotCards = AddBotCard(tempBotCards);
      currentBotTotal = ComputePoint(tempBotCards);
    }

    settle(currentBotTotal);
    setIsBotActing(false);
  }

  function settle(cBotTotal) {
    if (cBotTotal > 21) {
      setWin(true);
      setCurrentMoney((money) => money + 2 * betMoney);
    } else if (playerTotal == cBotTotal) {
      setDraw(true);
      setCurrentMoney((money) => money + betMoney);
    } else if (playerTotal < cBotTotal) {
      setLose(true);
    } else if (playerTotal > cBotTotal) {
      setWin(true);
      setCurrentMoney((money) => money + 2 * betMoney);
    }
    setIsBet(false);
  }

  return (
    <div className="blackjack">
      <CardsDisplay name="bot" cards={botCards} total={botTotal}></CardsDisplay>

      <img className="deck" src="/img/poker/default.png" alt="card backside" />

      <CardsDisplay
        name="player"
        cards={playerCards}
        total={playerTotal}
      ></CardsDisplay>

      <div className="player-controller">
        {!isBotActing &&
          (isBet ? (
            <div className="set-bet">
              <button className="add-btn" onClick={AddPlayerCard}>
                ADD
              </button>
              <button className="stop-btn" onClick={BotAct}>
                STOP
              </button>
            </div>
          ) : (
            <div className="set-bet">
              <button onClick={() => setBetMoney((money) => money - 100)}>
                -100
              </button>
              <button onClick={() => setBetMoney((money) => money - 10)}>
                -10
              </button>
              <p>{betMoney}</p>
              <button onClick={() => setBetMoney((money) => money + 10)}>
                +10
              </button>
              <button onClick={() => setBetMoney((money) => money + 100)}>
                +100
              </button>
            </div>
          ))}
        {!isBet && (
          <button
            className="bet-btn"
            onClick={() => {
              setIsBet(true);
              setCurrentMoney((money) => money - betMoney);
              Start();
            }}
          >
            BET
          </button>
        )}
      </div>

      {win && <div className="result win-text">WIN</div>}
      {draw && <div className="result draw-text">DRAW</div>}
      {lose && <div className="result lose-text">LOSE</div>}
    </div>
  );
}
