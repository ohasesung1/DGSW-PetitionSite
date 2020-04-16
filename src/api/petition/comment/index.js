import express from 'express';
import * as commentCtrl from './comment.ctrl.ctrl';
import authMiddleWare from '../../../middleware/auth';
const comment  = express.Router();

comment.post('/', authMiddleWare, commentCtrl.writeComment);
comment.delete('/', authMiddleWare, commentCtrl.deleteComment);

export default comment;