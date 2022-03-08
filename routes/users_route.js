const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller')
const userValidationRules = require('../validation/user');


router.post('/', userValidationRules.createRules, user_controller.register)


module.exports = router;