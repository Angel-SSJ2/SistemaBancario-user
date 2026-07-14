import { Router } from 'express';
import { createAccount, getMyAccounts, getMyAccount } from './account.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCreateAccount } from '../../middlewares/accounts-validator.js';

const router = Router();

router.get('/me', validateJWT, getMyAccount);
router.get('/', validateJWT, getMyAccounts);
router.post('/', validateJWT, validateCreateAccount, createAccount);

export default router;
