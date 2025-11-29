import React, { useEffect, useState } from "react";
import "./Clients.css";

interface Cliente {
  id: number;
  name: string;
  phone: string;
}

const ClientsPage: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/client")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Erro ao carregar clientes:", err));
  }, []);

  return (
    <div className="clients-container">
      <h1>Clientes</h1>

      <ul className="clients-list">
        {clientes.map((cliente) => (
          <li key={cliente.id} className="client-card">
            <strong>{cliente.name}</strong>
            <p>{cliente.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;