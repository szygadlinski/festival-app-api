/* eslint eqeqeq: 'off' */

const express = require('express');
const SeatController = require('../controllers/seats.controller');

const router = express.Router();

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getSingle);

router.post('/seats', SeatController.post);

router.put('/seats/:id', SeatController.put);

router.delete('/seats/:id', SeatController.delete);

module.exports = router;
