require('dotenv').config();
const app = require('./configs/app');

/**
 * Inicia el servidor de Express en el puerto definido en las variables de entorno.
 */
const startServer = () => {
    const port = process.env.PORT || 3002;
    app.listen(port, () => {
        console.log(`Servidor de Usuario corriendo en el puerto ${port}`);
    });
};

startServer();