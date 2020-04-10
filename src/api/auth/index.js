import express from 'express';
import * as authCtrl from './auth.ctrl';
const auth  = express.Router();

auth.post('/login', authCtrl.login);
auth.post('/register', authCtrl.registerMember);
auth.post('/find/id', authCtrl.validateId);

export default auth;
