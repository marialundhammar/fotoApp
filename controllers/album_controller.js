


const { matchedData, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const debug = require('debug')('photoApp:photo_controller');
const models = require('../models');


/*READ ALL PHOTOS*/
const read = async (req, res) => {
    const all_albums = await models.Album.fetchAll();

    res.send({
        status: 'success',
        data: {
            photo: all_albums
        }
    });
}