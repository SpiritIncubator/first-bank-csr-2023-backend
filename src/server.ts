import express, { Application } from 'express';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createServer } from 'http';
import { createClient } from 'redis';
import dotenv from 'dotenv';


import router from './routes';

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 5000;
const server = createServer(app);

async function initServer() {
  const pubClient = await createClient();
  const subClient = pubClient.duplicate();
  const io = new Server(server, {adapter: createAdapter(pubClient, subClient)});
  app.use('/api/v1', router);
  
  io.on("connection", (socket) => {})

  server.listen(port, () => console.log(`Server is running on ${port} port!`));
}

export default initServer;