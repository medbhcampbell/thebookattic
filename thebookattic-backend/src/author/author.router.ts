import express from 'express';

import logger from '../log';
import authorService from './author.service';

const router = express.Router();

router.get('/', function(req, res, next) {
    logger.debug('Attemping to get author list');
    authorService.getAllAuthors().then((authors) => {
        res.send(JSON.stringify(authors));
    });
});

router.get('/:id', function(req, res, next) {
    logger.debug('Attempting to retrieve author with id: ' + req.params.id);
    authorService.getAuthorById(Number(req.params.authorId)).then((author) => {
        res.send(JSON.stringify(author));
    });
});

router.post('/', function(req, res, next) {
    logger.debug('Attempting to add new reimbursement request: ' + req.params);
    authorService.addAuthor(req.body.userId, req.body.firstName, req.body.lastName, req.body.avgRating, req.body.bio, req.body.picture).then((data) => {
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

router.put('/', function(req, res, next) {
    logger.debug('Attemping to update existing author with following details: ' + req.params);
    authorService.updateAuthor(req.body).then((data) => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

router.delete('/:id', function(req, res, next) {
    logger.debug('Attemping to delete existing author: ' + req.params);
    authorService.removeAuthor(Number(req.params.id)).then((data) => {
        res.sendStatus(200);
    }).catch((error) => {
        logger.error('Failed to delete author: ' + error);
        res.sendStatus(500);
    });
});

export default router;