const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('./configs/db');

const app = express();

app.use('/api/transactions', require('./routes/transaction.routes'));

// Conectar a base de datos
dbConnection();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


module.exports = app;