import http from 'http';
import express from 'express';
import cors from 'cors';
import * as colorConsole from './lib/console';
import dotenv from 'dotenv';
import cacheController from 'express-cache-controller';
import api from './api';
import HTTPS from 'https'
import path from 'path';
import fs from 'fs';

dotenv.config();
const port  = process.env.PORT;
const { SSLPORT: sslport } = process.env;

const app = express();
const server = http.createServer(app);

app.use(cors())
   .use(express.json())
   .use(cacheController({
     maxAge: 0
   }));

app.use('/', api);

server.listen(port, () => {
  colorConsole.green(`DGSW-PetitionSite Server is listening on port => ${port}`);
});

try {
  const option = {
    ca: fs.readFileSync('/etc/letsencrypt/live/takeup.co.kr/fullchain.pem'),
    key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/takeup.co.kr/privkey.pem'), 'utf8').toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/takeup.co.kr/cert.pem'), 'utf8').toString(),
  };

  HTTPS.createServer(option, app).listen(sslport, () => {
    colorConsole.green(`[HTTPS] Soda Server is started on port ${colors.cyan(sslport)}`);
  });
} catch (error) {
  colorConsole.red('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
  colorConsole.gray(error);
}
