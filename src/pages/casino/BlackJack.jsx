import { useState, useEffect, useRef } from "react";
import { useData } from "../../Context";
import CardsDisplay from "../../components/casino/CardsDisplay";
import "./BlackJack.css";

export default function BlackJack() {
  const [playerCards, setPlayerCards] = useState([]);
  const [botCards, setBotCards] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [botTotal, setBotTotal] = useState(0);
  const isBet = useRef(false);
  const [isBotActing, setIsBotActing] = useState(false);
  const [betMoney, setBetMoney] = useState(0);
  const [lose, setLose] = useState(false);
  const [win, setWin] = useState(false);
  const [draw, setDraw] = useState(false);
  const { currentMoney, setCurrentMoney } = useData();
  const moneyRef = useRef(currentMoney);
  const betMoneyRef = useRef(0);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  if (!isBet.current && betMoney > currentMoney) {
    setBetMoney(currentMoney);
    betMoneyRef.current = currentMoney;
  }
  if (!isBet.current && betMoney < 10 && currentMoney >= 10) {
    setBetMoney(10);
    betMoneyRef.current = 10;
  }
  if (isBet.current && playerTotal > 21) {
    setLose(true);
    isBet.current=false;
  }

  if (moneyRef.current <= 0 && !isBet.current) {
    setCurrentMoney(-1);
    moneyRef.current = 9999;
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
      console.log(betMoneyRef.current);
      setWin(true);
      setCurrentMoney((money) => {const latestMoney = money + 2 * betMoneyRef.current; moneyRef.current = latestMoney; return latestMoney;});
    } else if (playerTotal == cBotTotal) {
      setDraw(true);
      setCurrentMoney((money) => {const latestMoney = money + betMoneyRef.current; moneyRef.current = latestMoney; return latestMoney;});
    } else if (playerTotal < cBotTotal) {
      setLose(true);
    } else if (playerTotal > cBotTotal) {
      console.log(betMoneyRef.current);
      setWin(true);
      setCurrentMoney((money) => {const latestMoney = money + 2 * betMoneyRef.current; moneyRef.current = latestMoney; return latestMoney;});
    }
    isBet.current=false;
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
          (isBet.current ? (
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
              <button
                onClick={() =>
                  setBetMoney((money) => {
                    const latestMoney = money - 100;
                    betMoneyRef.current = latestMoney;
                    return latestMoney;
                  })
                }
              >
                -100
              </button>
              <button
                onClick={() =>
                  setBetMoney((money) => {
                    const latestMoney = money - 10;
                    betMoneyRef.current = latestMoney;
                    return latestMoney;
                  })
                }
              >
                -10
              </button>
              <p>{betMoney}</p>
              <button
                onClick={() =>
                  setBetMoney((money) => {
                    const latestMoney = money + 10;
                    betMoneyRef.current = latestMoney;
                    return latestMoney;
                  })
                }
              >
                +10
              </button>
              <button
                onClick={() =>
                  setBetMoney((money) => {
                    const latestMoney = money + 100;
                    betMoneyRef.current = latestMoney;
                    return latestMoney;
                  })
                }
              >
                +100
              </button>
            </div>
          ))}
        {!isBet.current && (
          <button
            className="bet-btn"
            onClick={() => {
              console.log("Ref:", betMoneyRef.current);
              isBet.current=true;
              setCurrentMoney((money) => {
                const latestMoney = money - betMoneyRef.current;
                moneyRef.current = latestMoney;
                return latestMoney;
              });
              Start();
            }}
          >
            BET
          </button>
        )}
      </div>
      <button onClick={() => {console.log("moneyRef:", moneyRef.current)}}>moneyRef</button>

      {win && <div className="result win-text">WIN</div>}
      {draw && <div className="result draw-text">DRAW</div>}
      {lose && <div className="result lose-text">LOSE</div>}
    </div>
  );
}
