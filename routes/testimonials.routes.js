/* eslint eqeqeq: 'off' */

const express = require('express');
const TestimonialController = require('../controllers/testimonials.controller');

const router = express.Router();

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/random', TestimonialController.getRandom);

router.get('/testimonials/:id', TestimonialController.getSingle);

router.post('/testimonials', TestimonialController.post);

router.put('/testimonials/:id', TestimonialController.put);

router.delete('/testimonials/:id', TestimonialController.delete);

module.exports = router;
