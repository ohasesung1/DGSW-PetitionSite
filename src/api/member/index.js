import express from 'express';
import * as memberCtrl from './member.ctrl';
import authMiddleWare from '../../middleware/auth';
const member  = express.Router();

member.get('/admin', authMiddleWare, memberCtrl.getMemberList);
member.get('/search', authMiddleWare, memberCtrl.findMemberBySearch);

export default member;