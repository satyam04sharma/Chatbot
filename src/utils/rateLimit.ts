import rateLimit from 'express-rate-limit';
import Redis from 'ioredis';

let redis: Redis | null = null;

if (process.env.NODE_ENV === 'production') {
  redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
}

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  keyGenerator: (req) => req.ip,
  store: redis
    ? {
        incr: (key) => redis!.incr(key),
        resetKey: (key) => redis!.del(key),
      }
    : undefined, // Use memory store if Redis is not available
});

export const checkRateLimit = async (ip: string): Promise<boolean> => {
  if (!redis) return false; // Skip rate limiting if Redis is not available
  const count = await redis.get(`ratelimit:${ip}`);
  return count !== null && parseInt(count, 10) >= 20;
};