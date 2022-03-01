
const { matchedData, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const debug = require('debug')('photoApp:photo_controller');
const models = require('../models');


const read = async (req, res) => {
    const all_photos = await models.Photo.fetchAll();

    res.send({
        status: 'success',
        data: {
            photo: all_photos
        }
    });
}

const register = async (req, res) => {
    // check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // get only the validated data from the request
    const validData = matchedData(req);

    try {
        const photo = await new models.Photo(validData).save();
        debug("Saved new photo successfully: %O", photo);

        res.send({
            status: 'success',
            data: {
                photo
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new photo',
        });
        throw error;
    }
}

module.exports = {
    read,
    register,

}