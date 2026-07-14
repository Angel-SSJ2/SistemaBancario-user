import { Router } from 'express';
import { createPayment } from './payment.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCreatePayment } from '../../middlewares/payments-validator.js';

const router = Router();

router.post('/', validateJWT, validateCreatePayment, createPayment);

export default router;
