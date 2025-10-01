
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

function AlbumPage() {
  const { id } = useParams();

  toast({
    title: `🚧 Página de Álbum (ID: ${id})`,
    description: "Esta página no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀",
  });

  return (
    <div>
      <Helmet>
        <title>Álbum - HipHop Platform</title>
      </Helmet>
      <h1 className="text-white text-2xl">Página de Álbum (ID: {id})</h1>
      <p className="text-gray-400">Esta página mostrará los detalles de un álbum.</p>
    </div>
  );
}

export default AlbumPage;
