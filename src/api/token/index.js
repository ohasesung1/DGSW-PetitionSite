import express from 'express';
import * as tokenCtrl from './token.ctrl';

const token = express.Router();

token.post('/refresh', tokenCtrl.tokenRefresh);

export default token;
