const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' } });
});



router.use('/users', require('./users_route'));
router.use('/photos', require('./photo_route'));

module.exports = router;
