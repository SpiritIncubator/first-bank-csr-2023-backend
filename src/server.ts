import express, { Application } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors'

var whitelist = ['http://localhost:3000', 'https://first-bank-csr-2023-client.vercel.app']
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log('origin :', origin);
    if (!origin || whitelist.includes(origin)) {
      console.log('whitelist :', whitelist);
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};


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
    }
  });

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cors(corsOptions));
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