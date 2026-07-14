import { Router } from 'express';
import { getMyProfile, getAllUsers } from './user.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.get('/profile', validateJWT, getMyProfile);
router.get('/', validateJWT, getAllUsers);

export default router;
