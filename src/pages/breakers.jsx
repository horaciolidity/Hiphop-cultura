// src/pages/breakers.jsx
import React from "react";
import ArtistSection from "@/components/ArtistSection";

const breakers = [
  {
    name: "B-Boy PowerMove",
    bio: "Reconocido por su dominio de los power moves y estilo explosivo en batallas internacionales. Representa la vieja escuela con innovaciones modernas.",
    mp3: [], // normalmente breakers no tienen música propia, pero podés agregar si hay mixes
    videos: ["https://www.youtube.com/embed/bboy1"], // ejemplo de batalla
  },
  {
    name: "B-Girl Flow",
    bio: "Destacada en la escena por su estilo fluido, creatividad y fuerza. Ha representado a la comunidad en competencias nacionales e internacionales.",
    mp3: [],
    videos: ["https://www.youtube.com/embed/bgirl2"],
  },
];

export default function Breakers() {
  return <ArtistSection title="Breakers" artists={breakers} />;
}
