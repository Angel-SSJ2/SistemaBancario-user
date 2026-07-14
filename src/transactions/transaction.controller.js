`use strict`;

import { Transaction } from './transaction.model.js';
import { Account } from '../accounts/account.model.js';

export const getMyTransactions = async (req, res) => {
    try {
        const userAccounts = await Account.find({ userId: req.user.id }).select('accountNumber');
        const accountNumbers = userAccounts.map((acc) => acc.accountNumber);

        const filter = {
            $or: [
                { senderAccount: { $in: accountNumbers } },
                { receptorAccount: { $in: accountNumbers } },
            ],
        };

        if (req.query.type) {
            filter.type = req.query.type;
        }

        const transactions = await Transaction.find(filter)
            .populate('service', 'name provider')
            .sort({ date: -1 });

        res.status(200).json({ success: true, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener transacciones', error: error.message });
    }
};
