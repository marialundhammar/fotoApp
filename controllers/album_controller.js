const { matchedData, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const debug = require('debug')('photoApp:photo_controller');
const models = require('../models');
const Album = require('../models/Album');


/*READ ALL ALBUMS*/
const read = async (req, res) => {

    await req.user.load('albums');

    const albums = req.user.related('albums');

    res.status(200).send({
        status: 'success',
        data: {
            albums
        },
    });
}

const readOne = async (req, res) => {

    const album = await new models.Album({ id: req.params.albumId })
        .fetch({ withRelated: ['photos'] });


    res.status(200).send({
        status: 'success',
        data: {
            album
        },
    });



}



const register = async (req, res) => {


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail, the title needs to be at leat 4 characters long', data: errors.array() });
    }

    // get only the validated data from the request
    const userId = req.user.id;
    const validData = matchedData(req);
    validData.user_id = userId;

    try {

        const album = await new models.Album(validData).save();

        debug("Saved new album successfully: %O", album);



        res.send({
            status: 'success',
            data: {
                user_id: userId,
                title: validData.title,


            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new album',

        });
        throw error;

    }
}

const registerPhoto = async (req, res) => {

    // check for any validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }


    const validData = matchedData(req);
    console.log(validData);

    console.log(req.album);

    const album = await new models.Album({ id: req.params.albumId }).fetch({ withRelated: ['photos'] })

    const photos = album.related('photos');

    const existing_photo = photos.find(photo => photo.id == validData.photo_id);

    if (existing_photo) {
        return res.send({
            status: 'fail',
            data: 'Photo already exist'
        })
    }


    try {

        const result = await album.photos().attach(validData.photo_id);
        debug("Added photo to album successfully: %O", result);

        res.send({
            status: 'success',
            data: null
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when adding a photo to an album.',
        });
        throw error;
    }
}


const update = async (req, res) => {
    const albumId = req.params.albumId;

    // make sure user exists
    const album = await new models.Album({ id: albumId }).fetch({ require: false });
    if (!album) {
        debug("Album to update was not found. %o", { id: albumId });
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
        const updatedAlbum = await album.save(validData);
        debug("Updated photo successfully: %O", updatedAlbum);

        res.send({
            status: 'success',
            data: {
                album,
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
    readOne,
    register,
    registerPhoto,
    update,
}