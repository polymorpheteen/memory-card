import { useEffect, useState } from "react";
import "../styles/Cards.css";
import Card from "./Card";

export default function Cards() {
  const [pokemons, setPokemons] = useState([]);

  function getUniqueRandomIDs() {
    const ids = new Set();

    while (ids.size < 12) {
      const randomId = Math.floor(Math.random() * 1010) + 1;
      ids.add(randomId);
    }

    return Array.from(ids);
  }

  function handleCardClick(id) {
    console.log("Card clicked with id:", id);
  }

  useEffect(() => {
    const fetchAndBuildCards = async () => {
      try {
        // 1. Fetch list of all Pokémon (names & URLs)
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1010");
        const data = await res.json();

        // 2. Pick 12 random Pokémon using their index (ID)
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

    fetchAndBuildCards();
  }, []);

  if (pokemons.length === 0) {
    return <p>Loading random Pokémon...</p>;
  }

  return (
    <div className="container-wrapper">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          name={pokemon.name}
          id={pokemon.id}
          onClick={() => handleCardClick(pokemon.id)}
        />
      ))}
    </div>
  );
}
