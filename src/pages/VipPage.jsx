
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

function VipPage() {
  const { handle } = useParams();

  toast({
    title: `🚧 Página VIP (@${handle})`,
    description: "Esta página no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀",
  });

  return (
    <div>
      <Helmet>
        <title>Club VIP - HipHop Platform</title>
      </Helmet>
      <h1 className="text-white text-2xl">Página de Club VIP (@{handle})</h1>
      <p className="text-gray-400">Esta página mostrará los niveles de suscripción VIP para un artista.</p>
    </div>
  );
}

export default VipPage;
