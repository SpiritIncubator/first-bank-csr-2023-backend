import { createClient } from 'redis';

export const redisClient = createClient();

redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Redis Connection Error', err);
  }
})();