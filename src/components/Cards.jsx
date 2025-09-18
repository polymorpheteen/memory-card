import { useEffect, useState } from "react";
import "../styles/Cards.css";
import Card from "./Card";
import Modal from "./Modal";

export default function Cards() {
  const [pokemons, setPokemons] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bestScore, setBestScore] = useState(
    parseInt(localStorage.getItem("bestScore")) || 0
  );
  const [currentScore, setCurrentScore] = useState(0);

  function getUniqueRandomIDs() {
    const ids = new Set();

    while (ids.size < 12) {
      const randomId = Math.floor(Math.random() * 1010) + 1;
      ids.add(randomId);
    }

    return Array.from(ids);
  }

  const fetchAndBuildCards = async () => {
    try {
      // Fetch list of all Pokémon (names & URLs)
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1010");
      const data = await res.json();

      // Pick 12 random Pokémon using their index (ID)
      const randomIDs = getUniqueRandomIDs();

      const selectedPokemon = randomIDs.map((id) => {
        const name = data.results[id - 1].name;
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return { id, name, image };
      });

      setPokemons(selectedPokemon);
    } catch (error) {
      console.error("Failed to load Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchAndBuildCards();
  }, []);

  useEffect(() => {
    if (currentScore === 12) {
      setBestScore(currentScore);
      localStorage.setItem("bestScore", currentScore);
      setIsModalOpen(true);
      setClickedIds([]); // reset the clicked Pokémon
    }
  }, [currentScore]);

  function handleCardClick(id) {
    if (clickedIds.includes(id)) {
      console.log("Game Over! You clicked the same Pokemon twice");

      if (currentScore > bestScore) {
        setBestScore(currentScore);
        localStorage.setItem("bestScore", currentScore);
      }

      setIsModalOpen(true);
      setClickedIds([]);
    } else if (currentScore === 12) {
      setBestScore(currentScore);
      localStorage.setItem("bestScore", currentScore);
      setIsModalOpen(true);
      setClickedIds([]);
    } else {
      setClickedIds((prev) => [...prev, id]);
      setCurrentScore((prev) => prev + 1);
      shuffleCards();
    }
  }

  function shuffleCards() {
    setPokemons((prev) => [...prev].sort(() => Math.random() - 0.5));
  }

  function closeModal() {
    setIsModalOpen(false);
    setCurrentScore(0);
    fetchAndBuildCards();
  }

  if (pokemons.length === 0) {
    return <p>Loading random Pokémon...</p>;
  }

  return (
    <div className="wrapper">
      <div className="score-container">
        <div className="current-score">Score: {currentScore}</div>
        <div className="best-score">Best Score: {bestScore}</div>
      </div>
      <div className="cards-container">
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            name={pokemon.name}
            id={pokemon.id}
            image={pokemon.image}
            onClick={() => handleCardClick(pokemon.id)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentScore={currentScore}
        bestScore={bestScore}
      />
    </div>
  );
}
