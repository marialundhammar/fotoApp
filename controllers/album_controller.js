const { matchedData, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const debug = require('debug')('photoApp:photo_controller');
const models = require('../models');
const Album = require('../models/Album');


/*READ ALL ALBUMS*/
const read = async (req, res) => {

    const user_id = req.user.id;
    const user = await models.User.fetchById(user_id, { withRelated: ['albums'] });
    const albums = user.related('albums');

    res.status(200).send({
        status: 'success',
        data:
            albums

    });
}


/*READ ONE ALBUM WITH SPECIFIK ID*/
const readOne = async (req, res) => {

    album_id = req.params.albumId;
    user_id = req.user.id;

    //fetching user
    const user = await models.User.fetchById(user_id, { withRelated: ['albums'] });

    //fetching users Album
    const albumUser = user.related('albums').find(album => album.id == req.params.albumId);

    if (!albumUser) {
        return res.status(404).send({
            status: 'fail',
            data: 'Not users Album',
        });

    }

    const photosAlbum = await models.Album.fetchById(album_id, { withRelated: ['photos'], columns: ['id', 'title'] })

    res.status(200).send({
        status: 'success',
        data:
            photosAlbum
    })
}


const register = async (req, res) => {
    //Check if input is following validation rules 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: 'the title needs to be at leat 3 characters long' });
    }

    const userId = req.user.id;
    const validData = matchedData(req);
    validData.user_id = userId;

    try {
        const album = await new models.Album(validData).save();
        debug("Saved new album successfully: %O", album);

        res.send({
            status: 'success',
            data:
                album
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

    //check if it passes validation rules 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }


    const user_id = req.user.id;
    const album_id = req.params.albumId;

    const validData = matchedData(req);

    //fetching user and album by id
    const user = await models.User.fetchById(user_id, { withRelated: ['albums'] });
    const album = await models.Album.fetchById(album_id, { withRelated: ['photos'] });

    //Need this to check if photo exisit, if it's users album or users photo
    const existing_photo = album.related('photos').find(photo => photo.id == validData.photo_id);
    const albumUser = user.related('albums').find(album => album.id == req.params.albumId);
    const photosUser = user.related('photos').find(photo => photo.id == validData.photo_id);


    if (existing_photo) {
        return res.send({
            status: 'fail',
            data: 'Photo already exist'
        })
    } if (!albumUser || !photosUser) {
        return res.send({
            status: 'fail',
            data: 'Not users Album or users photo',
        });


    } else {
        try {
            const result = await album.photos().attach(validData.photo_id);
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
};

/*UPDATE ALBUM*/
const update = async (req, res) => {


    const album_id = req.params.albumId;
    const user_id = req.user.id;

    // get only the validated data from the request
    const validData = matchedData(req);

    // check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    const album = await new models.Album({ id: album_id, user_id: user_id }).fetch({ require: false });
    //MAYBE ADD DIFFERENT ERROR MESSAGE FOR album_id and user_id

    //Check if album belongs to user or if the album exisit 
    if (!album) {
        debug("Album to update was not found. %o", { id: album_id });
        res.status(404).send({
            status: 'fail',
            data: 'Album was not found or it does not belongs to user ',
        });
        return;

    } else {

        try {
            const updatedAlbum = await album.save(validData);
            debug("Updated photo successfully: %O", updatedAlbum);

            res.send({
                status: 'success',
                data:
                    album,

            });

        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'Exception thrown in database when updating a new user.',
            });
            throw error;
        }

    }
}

module.exports = {
    read,
    readOne,
    register,
    registerPhoto,
    update,
}