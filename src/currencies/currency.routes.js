import { Router } from 'express';
import { getAllCurrencies, getCurrencyByCode } from './currency.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.get('/', validateJWT, getAllCurrencies);
router.get('/:code', validateJWT, getCurrencyByCode);

export default router;
