
import React from 'react';
import { Helmet } from 'react-helmet';
import { toast } from '@/components/ui/use-toast';

function EventsPage() {
  toast({
    title: `🚧 Página de Eventos`,
    description: "Esta página no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀",
  });

  return (
    <div>
      <Helmet>
        <title>Eventos - HipHop Platform</title>
      </Helmet>
      <h1 className="text-white text-2xl">Página de Eventos</h1>
      <p className="text-gray-400">Esta página mostrará los próximos eventos, shows y festivales.</p>
    </div>
  );
}

export default EventsPage;
