const { response, request } = require('express');
const Transaction = require('../models/transaction.model.js');

// CREAR 
const createTransaction = async (req, res = response) => {
    const { sender, receiver, amount, description } = req.body;
    const transaction = new Transaction({ sender, receiver, amount, description });

    await transaction.save();
    res.json(transaction);
}

// Listar
const getTransactions = async (req, res = response) => {
    const transactions = await Transaction.find();
    res.json(transactions);
}

// Actualizar
const updateTransaction = async (req, res = response) => {
    const { id } = req.params;
    const { _id, date, ...data } = req.body;

    const transaction = await Transaction.findByIdAndUpdate(id, data, { new: true });
    res.json(transaction);
}

// Borrar
const deleteTransaction = async (req, res = response) => {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);
    res.json(transaction);
}

module.exports = {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
}