
const { matchedData, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const debug = require('debug')('photoApp:photo_controller');
const models = require('../models');



/*READ ALL PHOTOS*/
const read = async (req, res) => {
    const all_photos = await models.Photo.fetchAll();

    res.send({
        status: 'success',
        data: {
            photo: all_photos
        }
    });
}


/*READ ONE PHOTO ID*/

const showOne = async (req, res) => {
    const photo = await new models.Photo({ id: req.params.photoId }).fetch();

    res.send({
        status: 'success',
        data: {
            photo: photo,
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



const update = async (req, res) => {
    const photoId = req.params.photoId;

    // make sure user exists
    const photo = await new models.Photo({ id: photoId }).fetch({ require: false });
    if (!photo) {
        debug("Photo to update was not found. %o", { id: photoId });
        res.status(404).send({
            status: 'fail',
            data: 'Photo Not Found',
        });
        return;
    }

    // check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // get only the validated data from the request
    const validData = matchedData(req);

    try {
        const updatedPhoto = await photo.save(validData);
        debug("Updated photo successfully: %O", updatedPhoto);

        res.send({
            status: 'success',
            data: {
                photo,
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating a new user.',
        });
        throw error;
    }
}






module.exports = {
    read,
    register,
    showOne,
    update

}