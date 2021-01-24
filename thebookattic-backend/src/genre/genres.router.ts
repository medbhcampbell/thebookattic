import express from 'express';

import genreService from './genre.service';

const router = express.Router();

// Get all genres
router.get('/', function(req, res, next) {
    genreService.getGenres().then((genres) => {
        res.send(JSON.stringify(genres));
    });
});

// Get genre by id
router.get('/:id', function(req, res, next) {
    genreService.getGenreById(Number(req.params.authorId)).then((genre) => {
        res.send(JSON.stringify(genre));
    });
});

// Add genre to database
router.post('/', function(req, res, next) {
    genreService.addGenre(req.body.name).then((data) => {
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

// Remove genre by id
router.delete('/:id', function(req, res, next) {
    genreService.removeGenre(Number(req.params.id)).then((data) => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

export default router;