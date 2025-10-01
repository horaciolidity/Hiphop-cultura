// src/pages/grafiteros.jsx
import React from "react";
import ArtistSection from "@/components/ArtistSection";

const grafiteros = [
  {
    name: "Grafitero Ejemplo",
    bio: "Artista urbano con estilo único en murales y piezas callejeras, activo en la escena hip hop desde 2005. Ha participado en festivales de graffiti y su obra está presente en varias ciudades del país.",
    mp3: [], // puedes dejar vacío si no aplica
    videos: ["https://www.youtube.com/embed/xxxx"], // link de ejemplo
  },
  {
    name: "SprayMaster",
    bio: "Conocido por sus murales de gran formato y uso innovador del color. Fusiona graffiti con ilustración digital.",
    mp3: [],
    videos: ["https://www.youtube.com/embed/yyyy"],
  },
];

export default function Grafiteros() {
  return <ArtistSection title="Grafiteros" artists={grafiteros} />;
}
