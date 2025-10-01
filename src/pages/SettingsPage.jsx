
import React from 'react';
import { Helmet } from 'react-helmet';
import { toast } from '@/components/ui/use-toast';

function SettingsPage() {
  toast({
    title: `🚧 Página de Configuración`,
    description: "Esta página no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀",
  });

  return (
    <div>
      <Helmet>
        <title>Configuración - HipHop Platform</title>
      </Helmet>
      <h1 className="text-white text-2xl">Página de Configuración</h1>
      <p className="text-gray-400">Esta página permitirá al usuario configurar su cuenta y preferencias.</p>
    </div>
  );
}

export default SettingsPage;
