import rateLimit from 'express-rate-limit';
import Redis from 'ioredis';

let redis: Redis | null = null;

console.log('Initializing Redis connection');
redis = new Redis(process.env.REDIS_URL || 'redis://redis:6379');
console.log('Redis connection initialized');

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  keyGenerator: (req) => req.ip,
  store: redis
    ? {
        incr: (key) => {
          console.log('Incrementing rate limit for key:', key);
          return redis!.incr(key);
        },
        decrement: (key) => {
          console.log('Decrementing rate limit for key:', key);
          return redis!.decr(key);
        },
        resetKey: (key) => {
          console.log('Resetting rate limit for key:', key);
          return redis!.del(key);
        },
        resetAll: () => {
          console.log('Resetting all rate limits');
          return Promise.resolve();
        },
      }
    : undefined, // Use memory store if Redis is not available
});

export const checkRateLimit = async (ip: string): Promise<boolean> => {
  console.log('Checking rate limit for IP:', ip);
  if (!redis) {
    console.log('Redis not available, skipping rate limit check');
    return false; // Skip rate limiting if Redis is not available
  }
  const count = await redis.get(`ratelimit:${ip}`);
  console.log('Current rate limit count for IP:', ip, 'is:', count);
  return count !== null && parseInt(count, 10) >= 20;
};