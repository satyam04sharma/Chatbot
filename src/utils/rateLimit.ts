import rateLimit from 'express-rate-limit';
import Redis from 'ioredis';
import RedisStore, { RedisReply } from 'rate-limit-redis';

// Initialize Redis
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'redis-container',
  port: Number(process.env.REDIS_PORT) || 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  connectTimeout: 10000,
});

// Redis event handlers
redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redisClient.on('connect', () => {
  console.log('Redis connected successfully.');
});

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  keyGenerator: (req) => {
    const key = req.ip || 'default-ip';
    console.log(`Generating rate limit key: ${key}`);
    return key;
  },
  store: new RedisStore({
    sendCommand: (command: string, ...args: any[]) => redisClient.call(command, ...args) as Promise<RedisReply>,
  }),
});


/**
 * Checks if the given IP has exceeded the rate limit of 20 requests per 15 minute window.
 * If Redis is not available, this function will return false and not block the request.
 * @param {string} ip The IP address to check.
 * @returns {Promise<boolean>} true if the rate limit has been exceeded, false otherwise.
 */
export const checkRateLimit = async (ip: string): Promise<boolean> => {
  console.log(`Checking rate limit for IP: ${ip}`);
  if (!redisClient) {
    console.warn('Redis is not available, skipping rate limit check and falling back to in-memory store');
    return false; // Skip rate limiting if Redis is not available
  }
  try {
    const count = await redisClient.get(`rateLimit:${ip}`);
    console.log(`Current rate limit count for IP: ${ip} is: ${count}`);
    return count !== null && parseInt(count, 10) >= 20;
  } catch (err) {
    console.error('Redis get error:', err);
    return false; // On error, do not block request
  }
};