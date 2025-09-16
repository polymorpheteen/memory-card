import "../styles/Card.css";

export default function Card({ id, name, onClick }) {
  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const formattedName = name[0].toUpperCase() + name.slice(1);

  return (
    <div key={id} className="pokemon-card" onClick={onClick}>
      <img src={imageSource} />
      <h3>{formattedName}</h3>
    </div>
  );
}
