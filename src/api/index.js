import express from 'express';
const router  = express.Router();

import auth from './auth';
import petition from './petition';

router.use('/auth', auth);
router.use('/petition', petition);

export default router;