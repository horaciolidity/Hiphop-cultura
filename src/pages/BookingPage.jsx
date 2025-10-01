
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

function BookingPage() {
  const { handle } = useParams();

  toast({
    title: `🚧 Página de Contratación (@${handle})`,
    description: "Esta página no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀",
  });

  return (
    <div>
      <Helmet>
        <title>Contratación - HipHop Platform</title>
      </Helmet>
      <h1 className="text-white text-2xl">Página de Contratación (@{handle})</h1>
      <p className="text-gray-400">Esta página contendrá un formulario para contratar al artista.</p>
    </div>
  );
}

export default BookingPage;
