
import React from 'react';
import { Helmet } from 'react-helmet';
import { toast } from '@/components/ui/use-toast';

function ProfilePage() {
  toast({
    title: `🚧 Página de Perfil`,
    description: "Esta página no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀",
  });

  return (
    <div>
      <Helmet>
        <title>Mi Perfil - HipHop Platform</title>
      </Helmet>
      <h1 className="text-white text-2xl">Mi Perfil</h1>
      <p className="text-gray-400">Esta página mostrará el perfil del usuario logueado.</p>
    </div>
  );
}

export default ProfilePage;
