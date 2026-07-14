`use strict`;

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { dbConnection } from './db.js';
import { corsOptions } from './cors-configuration.js';
import { configureHelmet } from './helmet-configuration.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { handleErrors } from '../middlewares/handle-errors.js';

import accountsRoutes from '../src/accounts/account.routes.js';
import transfersRoutes from '../src/transfers/transfer.routes.js';
import paymentsRoutes from '../src/payments/payment.routes.js';
import transactionsRoutes from '../src/transactions/transactions.routes.js';
import currenciesRoutes from '../src/currencies/currency.routes.js';
import servicesRoutes from '../src/services/service.routes.js';
import monitoringRoutes from '../src/monitoring/monitoring.routes.js';
import rolesRoutes from '../src/role/role.routes.js';
import usersRoutes from '../src/users/user.routes.js';

const setupMiddlewares = (app) => {
    app.use(configureHelmet());
    app.use(cors(corsOptions));
    app.use(express.json({ limit: '10mb' }));
    app.use(requestLimit);
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(morgan('dev'));
};

const setupRoutes = (app) => {
    const BASE_URL = '/api/v1';

    app.use(`${BASE_URL}/accounts`, accountsRoutes);
    app.use(`${BASE_URL}/transfers`, transfersRoutes);
    app.use(`${BASE_URL}/payments`, paymentsRoutes);
    app.use(`${BASE_URL}/transactions`, transactionsRoutes);
    app.use(`${BASE_URL}/currencies`, currenciesRoutes);
    app.use(`${BASE_URL}/services`, servicesRoutes);
    app.use(`${BASE_URL}/monitoring`, monitoringRoutes);
    app.use(`${BASE_URL}/roles`, rolesRoutes);
    app.use(`${BASE_URL}/users`, usersRoutes);

    app.get(`${BASE_URL}/check`, (req, res) => {
        res.status(200).json({ message: 'SistemaBancario User Server is up and running' });
    });

    app.use(handleErrors);
};

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3002;

    try {
        await dbConnection();
        setupMiddlewares(app);
        setupRoutes(app);

        app.listen(PORT, () => {
            console.log(`Servidor de Usuario corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor de Usuario:', error);
    }
};
