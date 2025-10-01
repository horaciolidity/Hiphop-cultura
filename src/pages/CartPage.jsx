
import React from 'react';
import { Helmet } from 'react-helmet';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>Carrito de Compras - HipHop Platform</title>
        <meta name="description" content="Revisá y finalizá tu compra." />
      </Helmet>

      <h1 className="text-4xl font-bold text-white mb-8">Tu Carrito</h1>

      {items.length === 0 ? (
        <div className="text-center glass p-8 rounded-xl">
          <p className="text-gray-300 text-lg mb-4">Tu carrito está vacío.</p>
          <Link to="/explore">
            <Button className="bg-purple-600 hover:bg-purple-700">Explorar Contenido</Button>
          </Link>
        </div>
      ) : (
        <div className="glass p-6 rounded-xl">
          <div className="space-y-4">
            {items.map(item => (
              <div key={`${item.id}-${item.type}`} className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1701403320634-89390f3f417f" alt={item.title} className="w-16 h-16 rounded object-cover" />
                  <div className="ml-4">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-gray-400">por {item.artist_name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <p className="text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id, item.type)}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <Button variant="outline" onClick={clearCart}>Vaciar Carrito</Button>
            <div className="text-right">
              <p className="text-gray-300">Total:</p>
              <p className="text-2xl font-bold text-white">${total.toFixed(2)} ARS</p>
              <Link to="/checkout">
                <Button size="lg" className="mt-4 bg-green-600 hover:bg-green-700">Finalizar Compra</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
