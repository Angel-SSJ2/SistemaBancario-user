import helmet from 'helmet';

export const configureHelmet = () => {
    return helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    });
};
