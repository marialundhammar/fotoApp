
const { matchedData, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const debug = require('debug')('photoApp:photo_controller');
const models = require('../models');




/*READ ALL PHOTOS*/
const read = async (req, res) => {

    user_id = req.user.id;

    const allPhotos = await new models.Photo().where({ 'user_id': user_id }).fetchAll({ columns: ['id', 'title', 'url', 'comment'] });

    console.log(allPhotos);

    if (!allPhotos) {
        debug("Photo to update was not found. %o", { id: photoId });
        res.status(404).send({
            status: 'fail',
            data: 'Photo Not Found',
        });
        return;
    } else {

        res.status(200).send({
            status: 'success',
            data:
                allPhotos
            ,
        });

    }



}

//READ ONE PHOTO 
const readOne = async (req, res) => {


    user_id = req.user.id;
    photo_id = req.params.photoId;
    console.log(photo_id);

    const specifik_photo = await new models.Photo().where({ user_id: user_id, id: photo_id }).fetchAll({ columns: ['id', 'title', 'url', 'comment'] });

    res.status(200).send({
        status: 'success',
        data:
            specifik_photo,

    });
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
            data:
                photo
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
        res.status(404).send({
            status: 'fail',
            data: 'Photo Not Found',
        });
        return;
    }

    // check for any validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail, string must be at least 3 chars long,url string must be a url, comment string must be at least 3 chars long', data: errors.array() });
    }

    // get only the validated data from the request
    const validData = matchedData(req);

    try {
        const updatedPhoto = await photo.save(validData);
        debug("Updated photo successfully: %O", updatedPhoto);

        res.send({
            status: 'success',
            data:
                photo,

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