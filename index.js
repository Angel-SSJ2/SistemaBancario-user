require('dotenv').config();
const app = require('./src/app.js');
const { dbConnection } = require('./src/configs/db.js');

// Conexión a la DB
dbConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor administrativo corriendo en el puerto ${PORT}`);
});