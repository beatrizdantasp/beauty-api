import { useEffect, useState } from "react";
import "./Services.css";

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/service")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="services-container">
      <h1>Serviços</h1>

      <ul className="services-list">
        {services.map((service) => (
          <li key={service.id} className="service-card">
            <strong>{service.name}</strong>
            <p>Preço: R$ {service.price}</p>
            <p>Duração: {service.duration} min</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
