const Transaction = require('./transaction.model');
const Account = require('../accounts/account.model');

/**
 * Obtiene el historial exclusivo de transacciones (envíos y recepciones) de las cuentas del usuario autenticado.
 */
const getMyTransactions = async (req, res) => {
    const userAccounts = await Account.find({ userId: req.user.id }).select('accountNumber');
    const accountNumbers = userAccounts.map(acc => acc.accountNumber);

    const transactions = await Transaction.find({
        $or: [
            { senderAccount: { $in: accountNumbers } },
            { receptorAccount: { $in: accountNumbers } }
        ]
    }).populate('service', 'name').sort({ date: -1 });

    res.status(200).json({ success: true, transactions });
};

module.exports = { getMyTransactions };