import "../styles/Card.css";

export default function Card({ id, name, image, onClick }) {
  const formattedName = name[0].toUpperCase() + name.slice(1);

  return (
    <div key={id} className="pokemon-card" onClick={onClick}>
      <img src={image} />
      <h3>{formattedName}</h3>
    </div>
  );
}
