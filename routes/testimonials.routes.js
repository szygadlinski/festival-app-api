/* eslint eqeqeq: 'off' */

const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  const element = db.testimonials.find(element => element.id == req.params.id);

  if(element){
    res.json(element);
  } else {
    res.status(404).json({ message: 'You have to provide correct ID!' });
  }
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  if(author && text){
    db.testimonials.push({
      id: uuidv4(),
      author,
      text,
    });
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'You can\'t leave any fields empty!' });
  }
});

router.route('/testimonials/:id').put((req, res) => {
  const element = db.testimonials.find(element => element.id == req.params.id);
  const { author, text } = req.body;

  if(element){
    if(author && text){
      element.author = author;
      element.text = text;
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'You can\'t leave any fields empty!' });
    }
  } else {
    res.status(404).json({ message: 'You have to provide correct ID!' });
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const element = db.testimonials.find(element => element.id == req.params.id);

  if(element){
    const newTestimonials = [];
    for(let testimonial of db.testimonials){
      if(testimonial.id != req.params.id){
        newTestimonials.push(testimonial);
      }
    }
    db.testimonials = newTestimonials;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'You have to provide correct ID!' });
  }
});

module.exports = router;
