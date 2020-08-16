import express from 'express';
import * as petitionCtrl from './petition.ctrl';
import authMiddleWare from '../../middleware/auth';
import comment from './comment';
import answer from './answer';
const petition  = express.Router();

petition.post('/', authMiddleWare, petitionCtrl.writePetition);
petition.get('/', petitionCtrl.readPetitions);
petition.get('/detail', petitionCtrl.readPetitionDetail);
petition.post('/blind', authMiddleWare, petitionCtrl.blindPetition);
petition.get('/category', petitionCtrl.readPetitionCategory);
petition.delete('/', authMiddleWare, petitionCtrl.deletePetition);
petition.get('/search', petitionCtrl.searchPetitionByTitle);
petition.get('/get_student_council', authMiddleWare, petitionCtrl.getStudentCouncilPetition);

petition.use('/comment', comment);
petition.use('/answer', answer);

export default petition;
