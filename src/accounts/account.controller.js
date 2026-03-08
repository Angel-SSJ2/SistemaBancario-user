'use strict'

const User = require('../users/user.model')
const Account = require('./account.model')

/**
 * Ver saldo y número de cuenta del usuario
 */
const getMyAccount = async (req, res) => {
    try {
        const userId = req.user.id

        const user = await User.findById(userId)
            .select('name surname accountNumber balance')

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        res.status(200).json({
            success: true,
            account: user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la cuenta',
            error
        })
    }
}

/**
 * Crea una nueva cuenta bancaria
 */
const createAccount = async (req, res) => {
    try {
        const { accountType } = req.body
        const userId = req.user.id

        const accountNumber = Math.floor(
            1000000000 + Math.random() * 9000000000
        ).toString()

        const account = new Account({
            accountNumber,
            userId,
            accountType
        })

        await account.save()

        res.status(201).json({
            success: true,
            account
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la cuenta',
            error
        })
    }
}

/**
 * Obtiene todas las cuentas del usuario
 */
const getMyAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({
            userId: req.user.id,
            status: true
        })

        res.status(200).json({
            success: true,
            accounts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener cuentas',
            error
        })
    }
}

module.exports = {
    createAccount,
    getMyAccounts,
    getMyAccount
}