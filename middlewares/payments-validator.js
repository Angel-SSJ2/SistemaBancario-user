import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreatePayment = [
    body('senderAccount')
        .notEmpty().withMessage('La cuenta de origen es obligatoria')
        .isString().withMessage('La cuenta de origen debe ser texto'),
    body('serviceId')
        .notEmpty().withMessage('El ID del servicio es obligatorio')
        .isMongoId().withMessage('El ID del servicio no es válido'),
    body('amount')
        .notEmpty().withMessage('El monto es obligatorio')
        .isFloat({ min: 0.01 }).withMessage('El monto debe ser mayor a 0'),
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria')
        .isString().withMessage('La descripción debe ser texto'),
    checkValidators,
];
