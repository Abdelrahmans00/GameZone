import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import MemoryGame from "./MemoryGame";
import SnakeGame from "./SnakeGame";
import ConnectFour from "./ConnectFour";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game/memory" element={<MemoryGame />} />
      <Route path="/game/snakegame" element={<SnakeGame />} />
      <Route path="/game/connect4" element={<ConnectFour />} />
    </Routes>
  );
}

export default App;
