const Transaction = require('../transactions/transaction.model');
const Account = require('../accounts/account.model');
const Service = require('../services/service.model');

/**
 * Procesa el pago de un servicio validando la propiedad de la cuenta origen y el saldo disponible.
 */
const createPayment = async (req, res) => {
    const { senderAccount, serviceId, amount, description } = req.body;
    
    const account = await Account.findOne({ accountNumber: senderAccount, userId: req.user.id });
    if (!account) return res.status(403).json({ success: false, message: 'Cuenta de origen no válida o no autorizada' });
    
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
    
    if (account.balance < amount) return res.status(400).json({ success: false, message: 'Saldo insuficiente' });

    account.balance -= amount;
    await account.save();

    const transaction = new Transaction({ type: 'Payment', senderAccount, service: serviceId, amount, description });
    await transaction.save();

    res.status(201).json({ success: true, transaction });
};

module.exports = { createPayment };