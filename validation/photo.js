const { body } = require('express-validator');
const models = require('../models');


const createRules = [
    body('title').exists().isLength({ min: 4 }),
    body('url').exists(),
    body('comment').optional(),
    body('user_id').exists().isInt({ min: 1 }),

];


/* const updateRules = [
    body('title').exists().isLength({ min: 4 }),
]; */





module.exports = {
    createRules,
    /*     updateRules,
     */
}