import express from 'express';
import * as commentCtrl from './comment.ctrl';
import authMiddleWare from '../../../middleware/auth';
const comment  = express.Router();

comment.post('/', authMiddleWare, commentCtrl.writeComment);

export default comment;