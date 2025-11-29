import React from "react";
import "./Card.css";

interface CardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function Card({ title, subtitle, children }: CardProps) {
  return (
    <div className="card-container">
      <h2 className="card-title">{title}</h2>

      {subtitle && <p className="card-subtitle">{subtitle}</p>}

      <div className="card-content">
        {children}
      </div>
    </div>
  );
}
