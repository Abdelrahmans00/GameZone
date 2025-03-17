import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Card from './Card';
import "./MemoryGame.css";
import winSound from '/audio/bravo.mp3'; 

function Cards() {
  const navigate = useNavigate();
  
  const initializeGame = () => {
    return [
      { id: 1, img: '/GameZone/img/1.jpeg', stat: "" },
      { id: 1, img: '/GameZone/img/1.jpeg', stat: "" },
      { id: 2, img: '/GameZone/img/2.jpeg', stat: "" },
      { id: 2, img: '/GameZone/img/2.jpeg', stat: "" },
      { id: 3, img: '/GameZone/img/3.jpeg', stat: "" },
      { id: 3, img: '/GameZone/img/3.jpeg', stat: "" },
      { id: 4, img: '/GameZone/img/4.jpeg', stat: "" },
      { id: 4, img: '/GameZone/img/4.jpeg', stat: "" },
      { id: 5, img: '/GameZone/img/5.jpeg', stat: "" },
      { id: 5, img: '/GameZone/img/5.jpeg', stat: "" },
      { id: 6, img: '/GameZone/img/6.jpeg', stat: "" },
      { id: 6, img: '/GameZone/img/6.jpeg', stat: "" },
      { id: 7, img: '/GameZone/img/7.jpeg', stat: "" },
      { id: 7, img: '/GameZone/img/7.jpeg', stat: "" },
      { id: 8, img: '/GameZone/img/8.jpeg', stat: "" },
      { id: 8, img: '/GameZone/img/8.jpeg', stat: "" }
    ].sort(() => Math.random() - 0.5);
  };

  const [items, setItems] = useState(initializeGame);
  const [prev, setPrev] = useState(-1);
  const [gameWon, setGameWon] = useState(false);

  function check(current) {
    if (items[current].id === items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setPrev(-1);


      if (items.every(item => item.stat === "correct")) {
        new Audio(winSound).play(); 
        setGameWon(true); 
      }
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);

      setTimeout(() => {
        items[current].stat = "";
        items[prev].stat = "";
        setItems([...items]);
        setPrev(-1);
      }, 1000);
    }
  }

  function handleClick(id) {
    if (gameWon) return;

    if (prev === -1) {
      items[id].stat = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      check(id);
    }
  }

  function restartGame() {
    setItems(initializeGame());
    setPrev(-1);
    setGameWon(false);
  }

  return (
    <div className="memory-game">
      <div className="game-container">

        <button 
          onClick={() => navigate("/")} 
          className="back-home-btn"
        >
          ⬅ Back Home
        </button>


        <h1 className="game-title">Memory Game</h1>

    
        <div className="container">
          {items.map((item, index) => (
            <Card key={index} item={item} id={index} handleClick={handleClick} />
          ))}
        </div>

  
        {gameWon && (
          <button className="play-again-btn" onClick={restartGame}>
            🔄 Play Again
          </button>
        )}
      </div>
    </div>
  );
}

export default Cards;
