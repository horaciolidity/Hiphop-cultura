
class RealtimeService {
  constructor() {
    this.listeners = new Map();
    this.connected = false;
  }

  async connect() {
    // Mock connection - in real app this would connect to Supabase Realtime
    this.connected = true;
    console.log('Realtime service connected (mock)');
    return true;
  }

  async disconnect() {
    this.connected = false;
    this.listeners.clear();
    console.log('Realtime service disconnected');
  }

  subscribe(channel, event, callback) {
    const key = `${channel}:${event}`;
    
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    
    this.listeners.get(key).push(callback);
    
    console.log(`Subscribed to ${key} (mock)`);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(key) || [];
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
      if (callbacks.length === 0) {
        this.listeners.delete(key);
      }
    };
  }

  // Mock method to simulate real-time events
  emit(channel, event, data) {
    const key = `${channel}:${event}`;
    const callbacks = this.listeners.get(key) || [];
    
    callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in realtime callback:', error);
      }
    });
  }

  // Simulate common real-time events
  simulateNewMessage(chatId, message) {
    this.emit(`chat:${chatId}`, 'new_message', message);
  }

  simulateNewNotification(userId, notification) {
    this.emit(`user:${userId}`, 'notification', notification);
  }

  simulateNewReaction(contentId, reaction) {
    this.emit(`content:${contentId}`, 'reaction', reaction);
  }

  simulateNewFollow(userId, follower) {
    this.emit(`user:${userId}`, 'new_follower', follower);
  }

  isConnected() {
    return this.connected;
  }
}

export const realtimeService = new RealtimeService();
export default realtimeService;
