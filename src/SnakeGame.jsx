import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";

const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const INITIAL_SNAKE = [{ x: 200, y: 200 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const FOOD_SIZE = CELL_SIZE;
const FOOD_POSITION = (snake) => {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * (400 / CELL_SIZE)) * CELL_SIZE,
      y: Math.floor(Math.random() * (400 / CELL_SIZE)) * CELL_SIZE,
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  return food;
};

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(FOOD_POSITION(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();


  const getCanvasSize = () => {
    const maxWidth = 400; 
    const maxHeight = 400; 
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;


    const size = Math.min(screenWidth * 0.9, screenHeight * 0.6, maxWidth, maxHeight);
    return size;
  };

  const [canvasSize, setCanvasSize] = useState(getCanvasSize());


  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(getCanvasSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x * CELL_SIZE,
          y: head.y + direction.y * CELL_SIZE,
        };

 
        if (
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x >= canvasSize ||
          newHead.y >= canvasSize ||
          prevSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameOver(true);
          return INITIAL_SNAKE; 
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(FOOD_POSITION(newSnake));
          setScore((prevScore) => prevScore + 10);
          setSpeed((prevSpeed) => (prevSpeed > 50 ? prevSpeed - 5 : prevSpeed));
        } else {
          newSnake.pop(); 
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, gameOver, food, speed, canvasSize]);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!gameOver) {
        setDirection((prevDirection) => {
          if (event.key === "ArrowUp" && prevDirection.y === 0) return { x: 0, y: -1 };
          if (event.key === "ArrowDown" && prevDirection.y === 0) return { x: 0, y: 1 };
          if (event.key === "ArrowLeft" && prevDirection.x === 0) return { x: -1, y: 0 };
          if (event.key === "ArrowRight" && prevDirection.x === 0) return { x: 1, y: 0 };
          return prevDirection;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

 
  const handleTouchControl = (newDirection) => {
    if (!gameOver) {
      setDirection((prevDirection) => {
        if (newDirection === "up" && prevDirection.y === 0) return { x: 0, y: -1 };
        if (newDirection === "down" && prevDirection.y === 0) return { x: 0, y: 1 };
        if (newDirection === "left" && prevDirection.x === 0) return { x: -1, y: 0 };
        if (newDirection === "right" && prevDirection.x === 0) return { x: 1, y: 0 };
        return prevDirection;
      });
    }
  };


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");


    ctx.clearRect(0, 0, canvasSize, canvasSize);


    ctx.fillStyle = "lime";
    snake.forEach(segment => {
      ctx.fillRect(segment.x, segment.y, CELL_SIZE, CELL_SIZE);
    });


    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, FOOD_SIZE, FOOD_SIZE);
  }, [snake, food, canvasSize]);

  return (
    <div className='bg-gray-800 min-h-screen flex flex-col items-center justify-center p-4'>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-300">Snake Game</h1>
      <h2 className="text-lg md:text-xl text-slate-300 mb-4">Score: {score}</h2>
      {gameOver && (
        <div className="text-red-500 font-bold text-center">
          Game Over!
          <button
            onClick={() => {
              setGameOver(false);
              setSnake(INITIAL_SNAKE);
              setDirection(INITIAL_DIRECTION);
              setFood(FOOD_POSITION(INITIAL_SNAKE));
              setScore(0);
              setSpeed(INITIAL_SPEED);
            }}
            className="bg-red-500 text-white px-4 py-2 mt-3 rounded mx-2 m-3"
          >
            Restart
          </button>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="border bg-slate-500"
      ></canvas>

   
      <div className="mt-4 md:hidden">
        <div className="flex justify-center">
          <button
            onClick={() => handleTouchControl("up")}
            className="bg-blue-500 text-white px-6 py-3 rounded-full m-1"
          >
            ▲
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleTouchControl("left")}
            className="bg-blue-500 text-white px-6 py-3 rounded-full m-1"
          >
            ◀
          </button>
          <button
            onClick={() => handleTouchControl("right")}
            className="bg-blue-500 text-white px-6 py-3 rounded-full m-1"
          >
            ▶
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleTouchControl("down")}
            className="bg-blue-500 text-white px-6 py-3 rounded-full m-1"
          >
            ▼
          </button>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="back-home-btn m-4"
      >
        ⬅ Back Home
      </button>
    </div>
  );
}