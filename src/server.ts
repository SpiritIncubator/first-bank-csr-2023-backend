import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';

import router from './routes';

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 5000;

function initServer() {
  app.use('/api/v1', router);
  app.listen(port, () => console.log(`Server is running on ${port} port!`));
}

export default initServer;