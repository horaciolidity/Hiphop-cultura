
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

function PlaylistPage() {
  const { id } = useParams();

  toast({
    title: `🚧 Página de Playlist (ID: ${id})`,
    description: "Esta página no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀",
  });

  return (
    <div>
      <Helmet>
        <title>Playlist - HipHop Platform</title>
      </Helmet>
      <h1 className="text-white text-2xl">Página de Playlist (ID: {id})</h1>
      <p className="text-gray-400">Esta página mostrará una playlist de tracks o videos.</p>
    </div>
  );
}

export default PlaylistPage;
