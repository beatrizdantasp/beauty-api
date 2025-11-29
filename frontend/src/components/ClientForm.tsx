import React, { useState } from "react";

interface Props {
  onAdd: (data: { name: string; email: string; phone: string }) => void;
}

const ClientForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, email, phone });
    setName(""); setEmail(""); setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
      <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
      <input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} />

      <button type="submit" style={styles.button}>Cadastrar</button>
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: "var(--branco)",
    padding: "1rem",
    borderRadius: "10px",
    display: "flex",
    gap: "10px",
    border: "1px solid var(--bege)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "var(--preto)",
    color: "var(--bege)",
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    border: "none",
  },
};

export default ClientForm;
