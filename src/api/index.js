import express from 'express';
const router  = express.Router();

import auth from './auth';
import petition from './petition';
import member from './member';
import token from './token';

router.use('/auth', auth);
router.use('/petition', petition);
router.use('/token', token);
router.use('/member', member);

export default router;