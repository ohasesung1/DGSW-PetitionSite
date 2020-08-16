import express from 'express';
import authMiddleWare from '../../../middleware/auth';
import * as answerCtrl from './answer.ctrl';

const answer  = express.Router();

answer.post('/',authMiddleWare, answerCtrl.answerWrite);
answer.put('/',authMiddleWare, answerCtrl.answerUpdate);

export default answer;