import express, { Application } from 'express';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createServer } from 'http';
import { createClient } from 'redis';
import dotenv from 'dotenv';


import router from './routes';

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 3030;
const server = createServer(app);

async function initServer() {
  // const pubClient = await createClient();
  // const subClient = pubClient.duplicate();
  // , {adapter: createAdapter(pubClient, subClient)}
  const io = new Server(server, {
    cors: {
      origin: '*',
  }});
  app.use('/api/v1', router);
  
  io.on("connection", (socket) => {
    console.log('client has connected to the server!');

    socket.on('subscribeChannel', (args) => {
      socket.join(args.room);
    });

    socket.on('sendRoomMsg', ({ room, message }) => {
      io.to(room).emit(room, message);
    });

    socket.on('leaveRoom', ({ room }) => {
      socket.leave(room);
    })
  })

  server.listen(port, () => console.log(`Server is running on ${port} port!`));
}

export default initServer;