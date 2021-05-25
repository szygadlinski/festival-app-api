/* eslint eqeqeq: 'off' */

const express = require('express');
const ConcertController = require('../controllers/concerts.controller');

const router = express.Router();

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getSingle);

router.get('/concerts/performer/:performer', ConcertController.getByPerformer);

router.get('/concerts/genre/:genre', ConcertController.getByGenre);

router.get('/concerts/price/:price_min/:price_max', ConcertController.getByPrice);

router.get('/concerts/day/:day', ConcertController.getByDay);

router.post('/concerts', ConcertController.post);

router.put('/concerts/:id', ConcertController.put);

router.delete('/concerts/:id', ConcertController.delete);

module.exports = router;
