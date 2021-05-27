const express = require('express');
const morgan = require('morgan');
const config = require('../../config');
const logger = require('../logger');
const swaggerUi = require('swagger-ui-express');

class ExpressServer {

    constructor() {
        this.app = express();
        this.port = config.port;
        this.basePathUser = `${ config.api.prefix }/users`;

        this._middlewares();
        this._swaggerConfig(); // poner al principio para que otro middleware no interfiera

        this._routes();

        //manejadores de errores
        this._notFound();
        this._errorHandler();
    }

    // hace que express funcione con comunicación de content-type JSON
    _middlewares() {
        this.app.use(express.json());

        // loguea los request
        this.app.use(morgan('tiny'));
    }

    _routes() {
        // ruta de request para que el sector de infraestructura de la empresa monitoree en todo momento que esté funcionando la app
        this.app.head("/status", (req, res) => {
            res.status(200).end();
        });

        this.app.use( this.basePathUser, require('../../routes/users') );
    }

    // response 404
    _notFound() {
        this.app.use((req, res, next) => {
            const err = new Error("Not Found");
            err.code = 404;
            next(err);
        });
    }

    _errorHandler(app) {
        this.app.use((err, req, res, next) => {

            const code = err.code || 500;

            logger.error(`${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            logger.error(err.stack);
            
            const body = {
                error: {
                    code,
                    message: err.message
                }
            }
            res.status(code).json(body);

        });
    }

    _swaggerConfig() {
        this.app.use(
            config.swagger.path, 
            swaggerUi.serve, 
            swaggerUi.setup(require('../swagger/swagger.json'))
        );
    }

    async start () {
        this.app.listen(this.port, (error) => {

            if( error ) {
                logger.error( error );
                process.exit( 1 );
                return;
            }
        });
    }
}

module.exports = ExpressServer;