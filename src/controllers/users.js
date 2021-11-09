const express = require('express');
const userService = require('../services/userService')
const logger = require('../loaders/logger');
const Success = require('../handlers/successHandler');

/**
 * GET
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getAllUsers = async (req, res, next) => {

    try {

        logger.info('Query: ' + JSON.stringify(req.query));

        const users = await userService.findAll(req.query.filter, req.query.options);
        res.json(new Success(users));

    } catch (error) {
        next(error)
    }
};

/**
 * POST
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const createUser = async (req, res, next) => {

    try {
        let user = req.body;
        user = await userService.save(user);

        res.status(201).json(new Success(user));

    } catch (error) {
        next(error)
    }
};

/**
 * PUT
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const updateUser = async (req, res, next) => {

    try {
        const { id } = req.params;
        let user = req.body;

        const userUpdated = await userService.update(id, user);

        res.json(new Success(userUpdated));

    } catch (error) {
        next(error)
    }
};

/** 
* GET
* 
* @param {express.Request} req 
* @param {express.Response} res
*/

const getById = async (req, res, next) => {

    try {

        const user = await userService.findById(req.params.id);
        res.json(new Success(user));
        
    } catch (error) {
        next(error)
    }

};



/**
 * DELETE
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteUser = async (req, res, next) => {

    try {
        const { id } = req.params;
        const user = await userService.remove(id);
        res.json(new Success(user));

    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    getById,
    deleteUser
}

/*

 * PATCH
 * TODO
 * 
 * @param {express.Request} req 
 * @param {express.Response} res


const updatePartialUser = (req, res, next) => {

    const { id } = req.params;
    const user = req.body;

    user.id = id;

    const result = {
        message: 'User updated with patch'
    }

    res.json(result);
};
*/