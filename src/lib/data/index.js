
import InMemoryAdapter from './adapters/InMemoryAdapter';
import SupabaseAdapter from './adapters/SupabaseAdapter';

export function createDataClient() {
  const provider = import.meta.env.VITE_DATA_PROVIDER || 'memory';
  
  switch (provider) {
    case 'supabase':
      return new SupabaseAdapter();
    case 'memory':
    default:
      return new InMemoryAdapter();
  }
}

// Global data client instance
export const dataClient = createDataClient();
