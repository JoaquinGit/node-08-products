const ExpressServer = require('./server/expressServer');
const config = require('../config');
//const { loggers } = require('winston');
const logger = require('./logger');

module.exports = async () => {

    const server = new ExpressServer();
    logger.info('Express Loaded');

    server.start();
    logger.info(`########################################
      Server listening on port: ${config.port}
      ########################################
    `);
}

// module.exports = startServer;