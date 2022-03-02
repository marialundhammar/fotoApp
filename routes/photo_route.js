const express = require('express');
const router = express.Router();
const photo_controller = require('../controllers/photo_controller')
const photoValidationRules = require('../validation/photo');


router.get('/', photo_controller.read);

router.get('/:photoId', photo_controller.readOne);


router.post('/', photoValidationRules.createRules, photo_controller.register)

router.put('/:photoId', photoValidationRules.updateRules, photo_controller.update)


module.exports = router;