// src/pages/DJs.jsx
import React from "react";
import ArtistSection from "./ArtistSection";

const djs = [
  {
    name: "DJ Scratch",
    bio: "Pionero en el arte del turntablism, DJ Scratch ha acompañado a grandes MC´s y participado en batallas internacionales. Reconocido por sus rutinas de scratch y mezcla en vivo.",
    mp3: ["/media/dj-scratch-session.mp3"], // ejemplo de audio
    videos: ["https://www.youtube.com/embed/abcd1234"], // ejemplo de video
  },
  {
    name: "DJ Beatflow",
    bio: "DJ versátil que fusiona hip hop clásico con beats modernos. Habitual en competencias de freestyle y eventos de la cultura hip hop.",
    mp3: ["/media/dj-beatflow-mix.mp3"],
    videos: ["https://www.youtube.com/embed/wxyz5678"],
  },
];

export default function DJs() {
  return <ArtistSection title="DJ´s" artists={djs} />;
}
