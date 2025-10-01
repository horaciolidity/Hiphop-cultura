
import { toast } from '@/components/ui/use-toast';

class InMemoryAdapter {
  constructor() {
    this.data = new Map();
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Load mock data from JSON files
      const modules = await Promise.all([
        import('@/mocks/profiles.json'),
        import('@/mocks/tracks.json'),
        import('@/mocks/videos.json'),
        import('@/mocks/posts.json'),
        import('@/mocks/follows.json'),
        import('@/mocks/reactions.json'),
        import('@/mocks/comments.json'),
        import('@/mocks/orders.json'),
        import('@/mocks/subscriptions.json'),
        import('@/mocks/campaigns.json'),
        import('@/mocks/bookings.json'),
        import('@/mocks/points_ledger.json'),
        import('@/mocks/rewards.json'),
        import('@/mocks/redemptions.json'),
        import('@/mocks/notifications.json')
      ]);

      const [
        profiles, tracks, videos, posts, follows, reactions, 
        comments, orders, subscriptions, campaigns, bookings,
        pointsLedger, rewards, redemptions, notifications
      ] = modules.map(m => m.default);

      this.data.set('profiles', profiles);
      this.data.set('tracks', tracks);
      this.data.set('videos', videos);
      this.data.set('posts', posts);
      this.data.set('follows', follows);
      this.data.set('reactions', reactions);
      this.data.set('comments', comments);
      this.data.set('orders', orders);
      this.data.set('subscriptions', subscriptions);
      this.data.set('campaigns', campaigns);
      this.data.set('bookings', bookings);
      this.data.set('points_ledger', pointsLedger);
      this.data.set('rewards', rewards);
      this.data.set('redemptions', redemptions);
      this.data.set('notifications', notifications);

      this.initialized = true;
    } catch (error) {
      console.error('Error initializing InMemoryAdapter:', error);
      // Initialize with empty data if mock files fail to load
      this.initializeEmpty();
    }
  }

  initializeEmpty() {
    const collections = [
      'profiles', 'tracks', 'videos', 'posts', 'follows', 'reactions',
      'comments', 'orders', 'subscriptions', 'campaigns', 'bookings',
      'points_ledger', 'rewards', 'redemptions', 'notifications'
    ];

    collections.forEach(collection => {
      this.data.set(collection, []);
    });

    this.initialized = true;
  }

  // Generic CRUD operations
  async find(collection, filters = {}) {
    await this.initialize();
    const items = this.data.get(collection) || [];
    
    if (Object.keys(filters).length === 0) {
      return items;
    }

    return items.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (Array.isArray(value)) {
          return value.includes(item[key]);
        }
        return item[key] === value;
      });
    });
  }

  async findById(collection, id) {
    await this.initialize();
    const items = this.data.get(collection) || [];
    return items.find(item => item.id === id);
  }

  async create(collection, data) {
    await this.initialize();
    const items = this.data.get(collection) || [];
    const newItem = {
      ...data,
      id: data.id || this.generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    items.push(newItem);
    this.data.set(collection, items);
    return newItem;
  }

  async update(collection, id, data) {
    await this.initialize();
    const items = this.data.get(collection) || [];
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error(`Item with id ${id} not found in ${collection}`);
    }

    items[index] = {
      ...items[index],
      ...data,
      updated_at: new Date().toISOString()
    };
    
    this.data.set(collection, items);
    return items[index];
  }

  async delete(collection, id) {
    await this.initialize();
    const items = this.data.get(collection) || [];
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error(`Item with id ${id} not found in ${collection}`);
    }

    const deletedItem = items.splice(index, 1)[0];
    this.data.set(collection, items);
    return deletedItem;
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  // Specific methods for complex queries
  async getFollowersCount(userId) {
    const follows = await this.find('follows', { following_id: userId });
    return follows.length;
  }

  async getFollowingCount(userId) {
    const follows = await this.find('follows', { follower_id: userId });
    return follows.length;
  }

  async isFollowing(followerId, followingId) {
    const follows = await this.find('follows', { 
      follower_id: followerId, 
      following_id: followingId 
    });
    return follows.length > 0;
  }

  async getReactionsCount(contentId, contentType) {
    const reactions = await this.find('reactions', { 
      content_id: contentId, 
      content_type: contentType 
    });
    return reactions.length;
  }

  async getUserReaction(userId, contentId, contentType) {
    const reactions = await this.find('reactions', {
      user_id: userId,
      content_id: contentId,
      content_type: contentType
    });
    return reactions[0] || null;
  }

  async getCommentsCount(contentId, contentType) {
    const comments = await this.find('comments', {
      content_id: contentId,
      content_type: contentType
    });
    return comments.length;
  }

  async getUserPoints(userId) {
    const ledger = await this.find('points_ledger', { user_id: userId });
    return ledger.reduce((total, entry) => total + entry.points, 0);
  }
}

export default InMemoryAdapter;
