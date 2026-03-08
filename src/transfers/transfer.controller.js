const Transaction = require('../transactions/transaction.model');
const Account = require('../accounts/account.model');

/**
 * Ejecuta una transferencia asegurando estrictamente que la cuenta de origen pertenece al usuario autenticado.
 */
const createTransfer = async (req, res) => {
    const { senderAccount, receptorAccount, amount, description } = req.body;
    
    const sender = await Account.findOne({ accountNumber: senderAccount, userId: req.user.id });
    if (!sender) return res.status(403).json({ success: false, message: 'Cuenta de origen no válida o no autorizada' });
    
    const receptor = await Account.findOne({ accountNumber: receptorAccount });
    if (!receptor) return res.status(404).json({ success: false, message: 'Cuenta destino no encontrada' });
    
    if (sender.balance < amount) return res.status(400).json({ success: false, message: 'Saldo insuficiente' });

    sender.balance -= amount;
    receptor.balance += amount;
    
    await Promise.all([sender.save(), receptor.save()]);

    const transaction = new Transaction({ type: 'Transfer', senderAccount, receptorAccount, amount, description });
    await transaction.save();

    res.status(201).json({ success: true, transaction });
};

module.exports = { createTransfer };