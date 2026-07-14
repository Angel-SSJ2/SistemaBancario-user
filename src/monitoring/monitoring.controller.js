`use strict`;

import { Monitoring } from './monitoring.model.js';

export const getMyLogs = async (req, res) => {
    try {
        const logs = await Monitoring.find({ userId: req.user.id }).sort({ date: -1 });
        res.status(200).json({ success: true, logs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener registros', error: error.message });
    }
};

export const createLog = async (req, res) => {
    try {
        const { action, details } = req.body;

        const log = new Monitoring({
            action,
            userId: req.user.id,
            details,
        });
        await log.save();

        res.status(201).json({ success: true, log });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear registro', error: error.message });
    }
};
