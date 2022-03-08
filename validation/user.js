const { body } = require('express-validator');
const models = require('../models');


//Validation rules for register a new user 
const createRules = [


    body('email').exists().isLength({ min: 3 }).custom(async value => {
        const user = await new models.User({ email: value }).fetch({ require: false });
        if (user) {
            return Promise.reject("Emai already exisit")
        }
        return Promise.resolve();
    }),


    body('first_name').exists().isLength({ min: 3 }),
    body('last_name').exists().isLength({ min: 3 }),
    body('password').exists().isLength({ min: 6 }),



];





module.exports = {
    createRules,
}