const express = require('express');
const router = express.Router();
const album_controller = require('../controllers/album_controller')
const albumValidationRules = require('../validation/album');
const photoValidationRules = require('../validation/photo');


router.get('/', album_controller.read);

router.get('/:albumId', album_controller.readOne);


router.post('/', albumValidationRules.createRules, album_controller.register);

router.put('/:albumId', albumValidationRules.updateRules, album_controller.update);


router.post('/', albumValidationRules.createRules, album_controller.register);

router.post('/:albumId/photos', photoValidationRules.addToAlbum, album_controller.registerPhoto);

module.exports = router; 