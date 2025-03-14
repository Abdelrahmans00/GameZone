import { useNavigate } from "react-router-dom";
import game1 from "/img/game1.png";
import game2 from "/img/game2.png"; 
import game3 from "/img/game3.png"; 


function HomePage() {
  const navigate = useNavigate();

  const games = [
    { id: 1, name: "Memory Game", image: game1, route: "/game/memory" , description: "The Memory Game is a card-matching game that tests memory and concentration."},
    { id: 2, name: "Snake Game", image: game2, route: "/game/snakegame", description: "The Snake Game is a classic arcade game where players control a growing snake that moves around the screen." },
    { id: 3, name: "Connect Four", image: game3, route: "/game/connect4", description: "Connect 4 is a two-player strategy game where players take turns dropping colored discs into a vertical grid." },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('./dist/img/trig.jpg')" }}
      >
        <div className="absolute inset-0 bg-opacity-50"></div>
        <div className="z-10 text-center">
          <h1 className="text-5xl font-bold">Welcome to GameZone</h1>
          <p className="text-lg text-gray-300 mt-2">Discover and play the best games!</p>
        </div>
      </header>

      <section className="py-12 px-6 bg-gray-800">
        <h2 className="text-3xl font-semibold text-center">Trending Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {games.map((game) => (
            <div key={game.id} className="bg-gray-700 rounded-lg overflow-hidden">
              <img src={game.image || null} alt={game.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-medium">{game.name}</h3>
                <p className="text-gray-300 text-sm">{game.description}</p>
                <button
                  onClick={() => navigate(game.route)}
                  className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                >
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
