import PokemonLogo from "../assets/images/International_Pokémon_logo.svg";
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <span className="logo-wrapper">
        <img src={PokemonLogo} alt="Pokemon logo" className="logo" />
        <h1>Memory Card</h1>
      </span>
    </header>
  );
}
