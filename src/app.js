const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('./configs/db');
const userRoutes = require('./routes/user.routes.js');
const transactionRoutes = require('./routes/transactions.routes.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);

// Conectar a base de datos
dbConnection();



module.exports = app;