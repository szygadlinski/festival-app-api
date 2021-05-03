/* eslint eqeqeq: 'off' */

const express = require('express');
const ConcertController = require('../controllers/concerts.controller');

const router = express.Router();

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getSingle);

router.post('/concerts', ConcertController.post);

router.put('/concerts/:id', ConcertController.put);

router.delete('/concerts/:id', ConcertController.delete);

module.exports = router;
