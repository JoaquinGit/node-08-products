const ExpressServer = require('./server/expressServer');
const config = require('../config');
const logger = require('./logger');
const mongooseLoader = require('./mongoose');

module.exports = async () => {

    await mongooseLoader();
    logger.info('DB loaded and connected');

    const server = new ExpressServer();
    logger.info('Express Loaded');

    server.start();
    logger.info(`########################################
      Server listening on port: ${config.port}
      ########################################
    `);
}
