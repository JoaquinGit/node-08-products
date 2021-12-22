const { check } = require('express-validator');
const { validationResult } = require('../commons');
const { validToken, validRole } = require('../../services/authService');


const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailValid = check('email', 'Email is Invalid').isEmail();
const _PasswordRequired = check('password', 'Password required').not().isEmpty();


const postLoginRequestValidations = [
    _emailRequired,
    _emailValid,
    _PasswordRequired,
    validationResult
]

const validJWT = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = await validToken(token);       // comprobar validez del Token
        req.user = user; // creo atributo y le asigno valor de user a request para poder usarlo con cualquier código que se ejecute posteriormente
        next();

    } catch (err) {
        next(err);
    }
}

const hasRole = (...roles) => {
    return (req, res, next) => {
        try {
            validRole(req.user, ...roles);  // req.user fue asignado en el middleware anterior (validJWT)
            next();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    postLoginRequestValidations,
    validJWT,
    hasRole
}