const express = require('express');
const authService = require('../services/authService');
const logger = require('../loaders/logger');
const Success = require('../handlers/successHandler');

/**
 * POST
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const login = async (req, res, next) => {       ///-------- VERRR

    try {
        const { email, password } = req.body;
        

        res.json(new Success(await authService.login( email, password )));

    } catch (error) {
        next(error)
    }
};


module.exports = {
    login
}

