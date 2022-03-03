const { body } = require('express-validator');
const models = require('../models');


const createRules = [
    body('title').exists().isLength({ min: 4 }),
    body('url').exists(),
    body('comment').optional(),
    body('user_id').optional()

];


const updateRules = [
    body('title').exists().isLength({ min: 4 }),
];


const addToAlbum = [
    body('photo_id').exists().isInt({ min: 1 })
]


module.exports = {
    createRules,
    updateRules,
    addToAlbum

}