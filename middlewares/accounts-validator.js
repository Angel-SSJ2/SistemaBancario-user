import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateAccount = [
    body('accountType')
        .notEmpty().withMessage('El tipo de cuenta es obligatorio')
        .isIn(['Monetaria', 'Ahorro']).withMessage('El tipo de cuenta debe ser Monetaria o Ahorro'),
    checkValidators,
];
