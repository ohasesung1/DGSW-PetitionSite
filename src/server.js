import http from 'http';
import express from 'express';
import cors from 'cors';
import * as colorConsole from './lib/console';
import dotenv from 'dotenv';
import api from './api';

dotenv.config();
const port  = process.env.PORT;

const app = express();
const server = http.createServer(app);

app.use(cors())
   .use(express.json());

app.use('/', api);

server.listen(port, () => {
  colorConsole.green(`DGSW-PetitionSite Server is listening on port => ${port}`);
});