
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

function CampaignPage() {
  const { id } = useParams();

  toast({
    title: `🚧 Página de Campaña (ID: ${id})`,
    description: "Esta página no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀",
  });

  return (
    <div>
      <Helmet>
        <title>Campaña - HipHop Platform</title>
      </Helmet>
      <h1 className="text-white text-2xl">Página de Campaña (ID: {id})</h1>
      <p className="text-gray-400">Esta página mostrará los detalles de una campaña de crowdfunding.</p>
    </div>
  );
}

export default CampaignPage;
