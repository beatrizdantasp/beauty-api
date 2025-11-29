import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">Escova Express</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/clients">Clientes</Link></li>
        <li><Link to="/services">Serviços</Link></li>
        <li><Link to="/appointments">Agendamentos</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
