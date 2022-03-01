const express = require('express');
const router = express.Router();
const photo_controller = require('../controllers/photo_controller')
const photoValidationRules = require('../validation/photo');


router.get('/', photo_controller.read);


router.post('/', photoValidationRules.createRules, photo_controller.register)


module.exports = router;