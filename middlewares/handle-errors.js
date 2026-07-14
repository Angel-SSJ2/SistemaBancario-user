import logger from '../configs/logger.js';

export const handleErrors = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';

    logger.error(`[${req.method}] ${req.originalUrl} → ${status}: ${message}`);

    res.status(status).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
