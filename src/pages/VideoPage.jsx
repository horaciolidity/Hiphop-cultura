
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

function VideoPage() {
  const { id } = useParams();

  toast({
    title: `🚧 Página de Video (ID: ${id})`,
    description: "Esta página no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀",
  });

  return (
    <div>
      <Helmet>
        <title>Video - HipHop Platform</title>
      </Helmet>
      <h1 className="text-white text-2xl">Página de Video (ID: {id})</h1>
      <p className="text-gray-400">Esta página mostrará un reproductor de video y comentarios.</p>
    </div>
  );
}

export default VideoPage;
