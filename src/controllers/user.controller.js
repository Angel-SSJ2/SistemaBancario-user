const { response, request } = require('express');
const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');

const usersGet = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async (req, res = response) => {
    const { name, surname, email, password, role } = req.body;
    const user = new User({ name, surname, email, password, role });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
}

const usersPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, email, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto, { new: true });

    res.json(user);
}

const usersDelete = async (req, res = response) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json(user);
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}