const { body } = require('express-validator');
const models = require('../models');


const createRules = [
    body('first_name').exists().isLength({ min: 4 }),
    body('last_name').exists().isLength({ min: 4 }),
    body('password').exists().isLength({ min: 8 }),
    body('email').exists().isEmail()
];



const updateRules = [
    body('last_name').exists().isLength({ min: 4 }),
];

module.exports = {
    createRules,
    updateRules,
}