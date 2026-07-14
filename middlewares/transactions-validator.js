import { query } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateGetTransactions = [
    query('type')
        .optional()
        .isIn(['Deposit', 'Transfer', 'Payment'])
        .withMessage('El tipo debe ser Deposit, Transfer o Payment'),
    checkValidators,
];
