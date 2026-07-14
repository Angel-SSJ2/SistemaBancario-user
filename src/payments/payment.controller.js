`use strict`;

import { Transaction } from '../transactions/transaction.model.js';
import { Account } from '../accounts/account.model.js';
import { Service } from '../services/service.model.js';

export const createPayment = async (req, res) => {
    try {
        const { senderAccount, serviceId, amount, description } = req.body;

        const account = await Account.findOne({ accountNumber: senderAccount, userId: req.user.id });
        if (!account) {
            return res.status(403).json({ success: false, message: 'Cuenta de origen no válida o no autorizada' });
        }

        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
        }

        if (account.balance < amount) {
            return res.status(400).json({ success: false, message: 'Saldo insuficiente' });
        }

        account.balance -= amount;
        await account.save();

        const transaction = new Transaction({
            type: 'Payment',
            senderAccount,
            service: serviceId,
            amount,
            description,
        });
        await transaction.save();

        res.status(201).json({ success: true, transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al procesar el pago', error: error.message });
    }
};
