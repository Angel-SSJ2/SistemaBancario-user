const { Router } = require('express');
const {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactions.controller.js');

const router = Router();

router.post('/', createTransaction);
router.get('/', getTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;