
import { toast } from '@/components/ui/use-toast';

class MercadoPagoService {
  constructor() {
    this.enabled = import.meta.env.VITE_ENABLE_PAYMENTS === 'true';
    this.publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;
    this.accessToken = import.meta.env.VITE_MP_ACCESS_TOKEN;
  }

  async createPreference(items, payer = {}) {
    if (!this.enabled) {
      // Mock response for development
      const mockPreference = {
        id: `mock_pref_${Date.now()}`,
        init_point: '#',
        sandbox_init_point: '#',
        items,
        payer,
        back_urls: {
          success: `${window.location.origin}/checkout/success`,
          failure: `${window.location.origin}/checkout/failure`,
          pending: `${window.location.origin}/checkout/pending`
        },
        auto_return: 'approved',
        external_reference: `order_${Date.now()}`
      };

      toast({
        title: "🚧 Modo Demo",
        description: "Los pagos están en modo simulación. ¡Configurá Mercado Pago para pagos reales!"
      });

      return { preference: mockPreference, error: null };
    }

    try {
      // Real Mercado Pago implementation would go here
      const response = await fetch('/api/payments/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          payer,
          back_urls: {
            success: `${window.location.origin}/checkout/success`,
            failure: `${window.location.origin}/checkout/failure`,
            pending: `${window.location.origin}/checkout/pending`
          },
          auto_return: 'approved'
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error creating payment preference');
      }

      return { preference: data, error: null };
    } catch (error) {
      console.error('Error creating payment preference:', error);
      toast({
        title: "Error de pago",
        description: "No se pudo procesar el pago. Intentá de nuevo.",
        variant: "destructive"
      });
      return { preference: null, error };
    }
  }

  async verifyWebhook(payload, signature) {
    if (!this.enabled) {
      // Mock webhook verification
      console.log('Mock webhook received:', payload);
      return { valid: true, data: payload };
    }

    try {
      // Real webhook verification would go here
      const response = await fetch('/api/webhooks/mp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Signature': signature
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      return { valid: response.ok, data };
    } catch (error) {
      console.error('Error verifying webhook:', error);
      return { valid: false, error };
    }
  }

  async getPaymentStatus(paymentId) {
    if (!this.enabled) {
      // Mock payment status
      const statuses = ['approved', 'pending', 'rejected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: paymentId,
        status: randomStatus,
        status_detail: randomStatus === 'approved' ? 'accredited' : 'pending_waiting_payment',
        transaction_amount: 1000,
        currency_id: 'ARS'
      };
    }

    try {
      const response = await fetch(`/api/payments/${paymentId}/status`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting payment status:', error);
      throw error;
    }
  }

  // Mock webhook endpoint for development
  setupMockWebhook() {
    if (typeof window !== 'undefined' && !this.enabled) {
      // Simulate webhook calls in development
      window.mockMercadoPagoWebhook = (paymentData) => {
        console.log('Mock MercadoPago webhook called:', paymentData);
        
        // Simulate webhook processing
        setTimeout(() => {
          const event = new CustomEvent('mercadopago-webhook', {
            detail: paymentData
          });
          window.dispatchEvent(event);
        }, 1000);
      };
    }
  }
}

export const mercadoPagoService = new MercadoPagoService();
export default mercadoPagoService;
