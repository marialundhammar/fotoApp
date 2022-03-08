
const { matchedData, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const debug = require('debug')('photoApp:photo_controller');
const models = require('../models');




/*READ ALL PHOTOS*/
const read = async (req, res) => {



    user_id = req.user.id;


    const allPhotos = await new models.Photo().where('user_id', '=', user_id).fetchAll({ columns: ['id', 'title', 'url', 'comment'] });

    res.status(200).send({
        status: 'success',
        data: {
            photos: allPhotos
        },
    });
}


//READ ONE PHOTO 
const readOne = async (req, res) => {

    const readOne = async (req, res) => {


        await req.user.load('photos');

        const specifik_photo = await new models.Photo({ id: req.params.photoId }).fetch();

        const related_photos = req.user.related('photos');
        const existing_photo = related_photos.find(photo => photo.id == specifik_photo.id);

        res.status(200).send({
            status: 'success',
            data: {
                user: existing_photo,
            },
        });


    }

    try {
        res.status(200).send({
            status: 'success',
            data: {
                photo: existing_photo,
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



const register = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // get only the validated data from the request
    const userId = req.user.id;
    const validData = matchedData(req);
    validData.user_id = userId;


    try {
        const photo = await new models.Photo(validData).save();

        debug("Saved new photo successfully: %O", photo);



        res.send({
            status: 'success',
            data: {
                title: validData.title,
                comment: validData.comment,
                url: validData.url,
                user_id: userId
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
    update,
    readOne

}