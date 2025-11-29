import "./Home.css";

function HomePage() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Bem-vinda à Escova Express</h1>
        <p>O salão moderno que combina elegância, conforto e cuidado com você.</p>
      </div>

      <div className="home-grid">
        <div className="home-card">
          <h2>Clientes</h2>
          <p>Gerencie suas clientes com rapidez e organização.</p>
        </div>

        <div className="home-card">
          <h2>Serviços</h2>
          <p>Liste, edite e visualize todos os serviços do salão.</p>
        </div>

        <div className="home-card">
          <h2>Agendamentos</h2>
          <p>Acompanhe agenda, horários e disponibilidade.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
