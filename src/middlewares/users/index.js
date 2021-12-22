const { check } = require('express-validator');
const appError = require('../../errors/appError');
const userService = require('../../services/userService');
const { ROLES, ADMIN_ROLE } = require('../../constants');
const { validationResult } = require('../commons');
const { validJWT, hasRole } = require('../auth');


// POST validations
const _nameRequired = check('name', 'Name required').not().isEmpty();
const _lastNameRequired = check('lastName', 'Last Name required').not().isEmpty();
const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailValid = check('email', 'Email is Invalid').isEmail();
const _emailExist = check('email').custom(  // Custom function
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if (userFound) {
            throw new appError('Email already exist in DB', 400);
        }
    }
);
const _PasswordRequired = check('password', 'Password required').not().isEmpty();
const _roleValid = check('role').optional().custom(  // Custom function
    async (role = '') => {
        
        if (!ROLES.includes(role)) {
            throw new appError('Invalid Role', 400);
        }
    }
);
const _dateValid = check('birthdate').optional().isDate('MM-DD-YYYY');


// PUT Validations
const _idRequired = check('id').not().isEmpty();
const _idIsMongoDB = check('id').isMongoId();
const _idExist = check('id').custom(
    async (id = '') => {
        const userFound = await userService.findById(id);
        if (!userFound) {
            throw new appError('The id does not exist in DB', 400);
        }
    }
);
const _optionalEmailValid = check('email', 'Email is Invalid').optional().isEmail();
const _optionalEmailExist = check('email').optional().custom(  // Custom function
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if (userFound) {
            throw new appError('Email already exist in DB', 400);
        }
    }
);

const postRequestValidations = [
    validJWT,   // primero en el flujo de validaciones
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _lastNameRequired,
    _emailRequired,
    _emailValid,
    _emailExist,
    _PasswordRequired,
    _roleValid,
    _dateValid,
    validationResult
]

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idIsMongoDB,
    _idExist,
    _roleValid,
    _dateValid,
    _optionalEmailValid,
    _optionalEmailExist,
    validationResult
]

const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idIsMongoDB,
    _idExist,
    validationResult
]

const getAllRequestValidations = [
    validJWT
]

const getRequestValidations = [
    validJWT,
    _idRequired,
    _idIsMongoDB,
    _idExist,
    validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    deleteRequestValidations,
    getAllRequestValidations,
    getRequestValidations
}