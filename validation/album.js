const { body } = require('express-validator');
const models = require('../models');

const createRules = [
    body('title').exists().isLength({ min: 4 }),

];

const updateRules = [
    body('title').exists().isLength({ min: 4 }),
];



module.exports = {
    createRules,
    updateRules,

}