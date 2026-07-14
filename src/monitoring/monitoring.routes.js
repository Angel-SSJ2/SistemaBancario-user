import { Router } from 'express';
import { getMyLogs, createLog } from './monitoring.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.get('/', validateJWT, getMyLogs);
router.post('/', validateJWT, createLog);

export default router;
