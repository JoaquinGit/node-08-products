const { validationResult } = require('express-validator');
const appError = require('../errors/appError');

const validResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new appError('Validation Errors', 400, errors.errors);
    }
    next();
}

module.exports = {
    validationResult: validResult
}