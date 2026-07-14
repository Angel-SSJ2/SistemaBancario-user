`use strict`;

import { User } from '../users/user.model.js';
import { Account } from './account.model.js';

export const getMyAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('name surname email');

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el perfil', error: error.message });
    }
};

export const createAccount = async (req, res) => {
    try {
        const { accountType } = req.body;
        const userId = req.user.id;

        const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

        const account = new Account({ accountNumber, userId, accountType });
        await account.save();

        res.status(201).json({ success: true, account });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear la cuenta', error: error.message });
    }
};

export const getMyAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({ userId: req.user.id, status: true });

        res.status(200).json({ success: true, accounts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener cuentas', error: error.message });
    }
};
