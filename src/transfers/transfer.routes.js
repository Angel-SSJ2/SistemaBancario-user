import { Router } from 'express';
import { createTransfer } from './transfer.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCreateTransfer } from '../../middlewares/transfers-validator.js';

const router = Router();

router.post('/', validateJWT, validateCreateTransfer, createTransfer);

export default router;
