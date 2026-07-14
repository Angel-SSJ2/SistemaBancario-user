import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTransfer = [
    body('senderAccount')
        .notEmpty().withMessage('La cuenta de origen es obligatoria')
        .isString().withMessage('La cuenta de origen debe ser texto'),
    body('receptorAccount')
        .notEmpty().withMessage('La cuenta destino es obligatoria')
        .isString().withMessage('La cuenta destino debe ser texto'),
    body('amount')
        .notEmpty().withMessage('El monto es obligatorio')
        .isFloat({ min: 0.01 }).withMessage('El monto debe ser mayor a 0'),
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria')
        .isString().withMessage('La descripción debe ser texto'),
    checkValidators,
];
