// src/components/ArtistSection.jsx
import React from "react";

export default function ArtistSection({ title, artists }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      {artists.map((artist, idx) => (
        <div
          key={idx}
          className="mb-6 border border-gray-700 rounded-lg p-4 shadow bg-gray-900 text-white"
        >
          <h2 className="text-xl font-semibold mb-2">{artist.name}</h2>
          <p className="mb-4">{artist.bio}</p>

          {/* 🎵 MP3 */}
          {artist.mp3?.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold">🎵 MP3</h3>
              {artist.mp3.map((url, i) => (
                <audio key={i} controls src={url} className="my-2 w-full" />
              ))}
            </div>
          )}

          {/* 🎥 Videos */}
          {artist.videos?.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold">🎥 Videos</h3>
              {artist.videos.map((url, i) => (
                <iframe
                  key={i}
                  src={url}
                  className="w-full h-64 my-2"
                  allowFullScreen
                />
              ))}
            </div>
          )}

          {/* 📩 Formulario de contratación */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">📩 Contratación</h3>
            <form className="space-y-2">
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full p-2 border rounded bg-gray-800 text-white"
              />
              <input
                type="email"
                placeholder="Tu correo"
                className="w-full p-2 border rounded bg-gray-800 text-white"
              />
              <textarea
                placeholder="Mensaje"
                className="w-full p-2 border rounded bg-gray-800 text-white"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
