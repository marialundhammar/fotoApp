const { body } = require('express-validator');
const models = require('../models');


//Validation rules for register a new user 
const createRules = [
    body('first_name').exists().isLength({ min: 3 }),
    body('last_name').exists().isLength({ min: 3 }),
    body('password').exists().isLength({ min: 6 }),
    body('email').exists().isEmail()
];




module.exports = {
    createRules,
}