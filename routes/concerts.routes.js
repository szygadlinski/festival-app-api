/* eslint eqeqeq: 'off' */

const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const element = db.concerts.find(element => element.id == req.params.id);

  if(element){
    res.json(element);
  } else {
    res.status(404).json({ message: 'You have to provide correct ID!' });
  }
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if(performer && genre && price && day && image){
    db.concerts.push({
      id: uuidv4(),
      performer,
      genre,
      price,
      day,
      image,
    });
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Youe can\'t leave any fields empty!' });
  }
});

router.route('/concerts/:id').put((req, res) => {
  let element = db.concerts.find(element => element.id == req.params.id);
  const { performer, genre, price, day, image } = req.body;

  if(element){
    if(performer && genre && price && day && image){
      element.performer = performer;
      element.genre = genre;
      element.price = price;
      element.day = day;
      element.image = image;
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'You can\'t leave any fields empty!' });
    }
  } else {
    res.status(404).json({ message: 'You have to provide correct ID!' });
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const element = db.concerts.find(element => element.id == req.params.id);

  if(element){
    const newConcerts = [];

    for(let concert of db.concerts){
      if(concert.id != req.params.id){
        newConcerts.push(concert);
      }
    }
    db.concerts = newConcerts;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'You have to provide correct ID!' });
  }
});

module.exports = router;
