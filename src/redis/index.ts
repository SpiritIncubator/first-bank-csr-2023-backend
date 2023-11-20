import { createClient } from 'redis';

export  async function initRedis() {
  const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

client.connect();
}