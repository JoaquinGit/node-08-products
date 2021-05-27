//const express = require('express');

// GET
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getAllUsers = (req, res) => {

    const users = [
        {
        id: 1,
        name: "Joaquin"
        },
        {
        id: 2,
        name: "Gisela"
        }
    ]

    // prueba errorHandler
    //throw new Error('Ocurrió un error al obtener los usuarios de la base de datos.');

    // Para lanzar un 504. (Solución rápida sin crear clase Error propia)
   /*  let error = new Error('Ocurrió un error al obtener los usuarios de la base de datos.');
    error.code = 504;
    throw error; */

    res.json(users);    // status(200) por default
};

// POST
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const createUser = (req, res) => {

    const user = req.body;
    user.id = 5484;

    const result = {
        message: 'User created',
        user
    }

    res.status(201).json(result);
};

// PUT
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const updateUser = (req, res) => {

    const { id } = req.params;
    const user = req.body;

    user.id = id;

    const result = {
        message: 'User updated',
        user
    }

    res.json(result);
};

// PATCH
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const updatePartialUser = (req, res) => {

    const { id } = req.params;
    const user = req.body;

    user.id = id;
    
    const result = {
        message: 'User updated with patch'
    }

    res.json(result);
};

// DELETE
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteUser = (req, res) => {
    
    const { id } = req.params;

    const result = {
        message: `User with id ${id} deleted`
    }

    res.json(result);
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser
}