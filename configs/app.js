const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('./db');
const { corsOptions } = require('./cors-configuration');
const { configureHelmet } = require('./helmet-configuration');
const { apiLimiter } = require('../middlewares/rate-limit');

const app = express();

dbConnection();

app.use(configureHelmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(apiLimiter);

app.use('/api/v1/accounts', require('../src/accounts/account.routes'));
app.use('/api/v1/transfers', require('../src/transfers/transfer.routes'));
app.use('/api/v1/payments', require('../src/payments/payment.routes'));
app.use('/api/v1/transactions', require('../src/transactions/transactions.routes'));

module.exports = app;