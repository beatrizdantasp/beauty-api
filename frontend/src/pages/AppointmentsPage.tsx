import { useEffect, useState } from "react";
import "./Appointments.css";

interface Appointment {
  id: number;
  date: string;
  client: { name: string };
  service: { name: string };
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/appointment")
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, []);

  return (
    <div className="appointments-container">
      <h1>Agendamentos</h1>

      <ul className="appointments-list">
        {appointments.map((ag) => (
          <li key={ag.id} className="appointment-card">
            <h3>{ag.client.name}</h3>
            <p>Serviço: {ag.service.name}</p>
            <p>Data: {ag.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
