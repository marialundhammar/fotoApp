const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' } });
});

/* auth.basic */

router.use('/users', require('./users_route'));
router.use('/photos', auth.basic, require('./photo_route'));
router.use('/albums', auth.basic, require('./album_route'));
/* router.use('/profile', , require('./photo_route')); */


module.exports = router;
