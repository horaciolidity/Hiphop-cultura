
import React from 'react';
import { Helmet } from 'react-helmet';
import { toast } from '@/components/ui/use-toast';

function CheckoutPage() {
  toast({
    title: `🚧 Página de Checkout`,
    description: "Esta página no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀",
  });

  return (
    <div>
      <Helmet>
        <title>Checkout - HipHop Platform</title>
      </Helmet>
      <h1 className="text-white text-2xl">Página de Checkout</h1>
      <p className="text-gray-400">Esta página contendrá las opciones de pago y la finalización de la compra.</p>
    </div>
  );
}

export default CheckoutPage;
