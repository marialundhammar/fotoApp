const { body } = require('express-validator');
const models = require('../models');


//Validation rules for register a new photo
const createRules = [
    body('title').exists().isLength({ min: 4 }),
    body('url').exists(),
    body('comment').optional(),
    body('user_id').optional()

];

//Validation rules for updating a new photo
const updateRules = [
    body('title').exists().isLength({ min: 4 }),
];


//Validation rules for adding a new photo to a album
const addToAlbum = [
    body('photo_id').exists().isInt({ min: 1 })
]


module.exports = {
    createRules,
    updateRules,
    addToAlbum

}