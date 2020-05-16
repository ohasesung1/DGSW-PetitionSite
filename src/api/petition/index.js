import express from 'express';
import * as petitionCtrl from './petition.ctrl';
import authMiddleWare from '../../middleware/auth';
import comment from './comment';
const petition  = express.Router();

petition.post('/', authMiddleWare, petitionCtrl.writePetition);
petition.get('/', petitionCtrl.readPetitions);
petition.get('/all', petitionCtrl.readAllPetitions);
petition.get('/detail', petitionCtrl.readPetitionDtail);
petition.get('/admin', authMiddleWare, petitionCtrl.readNotAllowedPetition);
petition.get('/is_allowed', authMiddleWare, petitionCtrl.isAllowedPetition);
petition.post('/blind', authMiddleWare, petitionCtrl.blindPetition);
petition.get('/category', petitionCtrl.readPetitionCategory);
petition.delete('/', authMiddleWare, petitionCtrl.deletePetition);

petition.use('/comment', comment);

export default petition;
