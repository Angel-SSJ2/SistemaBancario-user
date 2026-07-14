import { Router } from 'express';
import { getMyTransactions } from './transaction.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateGetTransactions } from '../../middlewares/transactions-validator.js';

const router = Router();

router.get('/my-history', validateJWT, validateGetTransactions, getMyTransactions);

export default router;
