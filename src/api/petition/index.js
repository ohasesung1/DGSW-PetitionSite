import express from 'express';
import * as petitionCtrl from './petition.ctrl';
import authMiddleWare from '../../middleware/auth';
const petition  = express.Router();

petition.post('/', authMiddleWare, petitionCtrl.writePetition);
petition.get('/', authMiddleWare, petitionCtrl.readPetitions);
petition.put('/', authMiddleWare, petitionCtrl.updatePetition);
petition.delete('/', authMiddleWare, petitionCtrl.deletePetition);

export default petition;
