import express from 'express';
import cors from 'cors';
import allRouters from './routers/index.js';
import { deleteInactives } from './controllers/user.controllers.js';

const server = express();
server.use(cors());
server.use(express.json());
server.use(allRouters);
deleteInactives();

server.listen(5000, () => console.log('Listening on port 5000'));