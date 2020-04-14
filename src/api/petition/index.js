import express from 'express';
import * as petitionCtrl from './petition.ctrl';
import authMiddleWare from '../../middleware/auth';
const petition  = express.Router();

// petition.post('/login', authCtrl.login);
// petition.post('/register', authCtrl.registerMember);
// petition.post('/find/id', authCtrl.validateId);
// petition.post('/grant', authMiddleWare, authCtrl.grantAuth);

export default auth;