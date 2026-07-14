`use strict`;

import { User } from './user.model.js';

export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-__v');

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el perfil', error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ status: true }).select('-__v');
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
    }
};
