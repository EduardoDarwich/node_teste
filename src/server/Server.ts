import express from 'express';
import {router} from './routes';
import 'dotenv/config';
import './shared/middlewares/services/translationsYup';

const server = express();

server.use(express.json());

server.use(router);

export { server };  