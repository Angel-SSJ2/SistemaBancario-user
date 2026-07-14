`use strict`;

import { Currency } from './currency.model.js';

export const getAllCurrencies = async (req, res) => {
    try {
        const currencies = await Currency.find({ status: true });
        res.status(200).json({ success: true, currencies });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener monedas', error: error.message });
    }
};

export const getCurrencyByCode = async (req, res) => {
    try {
        const currency = await Currency.findOne({ code: req.params.code.toUpperCase(), status: true });

        if (!currency) {
            return res.status(404).json({ success: false, message: 'Moneda no encontrada' });
        }

        res.status(200).json({ success: true, currency });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la moneda', error: error.message });
    }
};
