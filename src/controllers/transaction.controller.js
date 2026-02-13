const Transaction = require('../models/transaction.model');

const getHistory = async (req, res) => {
    const uid = req.user.uid; 

    try {
        const history = await Transaction.find({
            $or: [
                { sender: uid },
                { receiver: uid }
            ]
        })
        .populate('sender', 'name surname') 
        .populate('receiver', 'name surname') 
        .sort({ date: -1 }) // Los más recientes primero
        .limit(10); // Solo los últimos 10

        res.status(200).json({
            msg: 'Historial de movimientos reciente',
            history
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener el historial' });
    }
};

module.exports = { getHistory };