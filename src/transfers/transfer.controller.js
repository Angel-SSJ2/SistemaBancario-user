`use strict`;

import { Transaction } from '../transactions/transaction.model.js';
import { Account } from '../accounts/account.model.js';

export const createTransfer = async (req, res) => {
    try {
        const { senderAccount, receptorAccount, amount, description } = req.body;

        const sender = await Account.findOne({ accountNumber: senderAccount, userId: req.user.id });
        if (!sender) {
            return res.status(403).json({ success: false, message: 'Cuenta de origen no válida o no autorizada' });
        }

        const receptor = await Account.findOne({ accountNumber: receptorAccount });
        if (!receptor) {
            return res.status(404).json({ success: false, message: 'Cuenta destino no encontrada' });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ success: false, message: 'Saldo insuficiente' });
        }

        sender.balance -= amount;
        receptor.balance += amount;
        await Promise.all([sender.save(), receptor.save()]);

        const transaction = new Transaction({
            type: 'Transfer',
            senderAccount,
            receptorAccount,
            amount,
            description,
        });
        await transaction.save();

        res.status(201).json({ success: true, transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al realizar la transferencia', error: error.message });
    }
};
