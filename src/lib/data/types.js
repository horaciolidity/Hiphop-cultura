
// User and Profile Types
export const UserRole = {
  USER: 'user',
  ARTIST: 'artist',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
};

export const SubscriptionTier = {
  FREE: 'free',
  VIP: 'vip',
  PREMIUM: 'premium'
};

// Content Types
export const ContentType = {
  TRACK: 'track',
  VIDEO: 'video',
  ALBUM: 'album',
  PLAYLIST: 'playlist',
  POST: 'post'
};

export const ReactionType = {
  LIKE: 'like',
  FIRE: 'fire',
  HEART: 'heart',
  LAUGH: 'laugh',
  ANGRY: 'angry'
};

// Commerce Types
export const OrderStatus = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

export const CampaignStatus = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  FUNDED: 'funded',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};

export const BookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};

// Points and Rewards
export const PointsAction = {
  UPLOAD_TRACK: 'upload_track',
  UPLOAD_VIDEO: 'upload_video',
  CREATE_POST: 'create_post',
  RECEIVE_LIKE: 'receive_like',
  RECEIVE_FOLLOW: 'receive_follow',
  DAILY_LOGIN: 'daily_login',
  REFERRAL: 'referral',
  PURCHASE: 'purchase',
  REDEEM_REWARD: 'redeem_reward'
};

export const RewardType = {
  DISCOUNT: 'discount',
  MERCHANDISE: 'merchandise',
  EXCLUSIVE_CONTENT: 'exclusive_content',
  VIP_ACCESS: 'vip_access'
};
