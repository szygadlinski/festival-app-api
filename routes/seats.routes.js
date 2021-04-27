/* eslint eqeqeq: 'off' */

const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const element = db.seats.find(element => element.id == req.params.id);

  if(element){
    res.json(element);
  } else {
    res.status(404).json({ message: 'You have to provide correct ID!' });
  }
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const element = db.seats.find(element => (element.day == day) && (element.seat == seat));

  if(element){
    res.status(409).json({ message: 'The slot is already taken...' });
  } else {
    if(day && seat && client && email){
      db.seats.push({
        id: uuidv4(),
        day,
        seat,
        client,
        email,
      });
      res.json({ message: 'OK' });
      req.io.emit('seatsUpdated', db.seats, console.log('Seats updated!'));
    } else {
      res.status(404).json({ message: 'You can\'t leave any fields empty!' });
    }
  }
});

router.route('/seats/:id').put((req, res) => {
  let element = db.seats.find(element => element.id == req.params.id);
  const { day, seat, client, email } = req.body;

  if(element){
    if(day && seat && client && email){
      element.day = day;
      element.seat = seat;
      element.client = client;
      element.email = email;
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'You can\'t leave any fields empty!' });
    }
  } else {
    res.status(404).json({ message: 'You have to provide correct ID!' });
  }
});

router.route('/seats/:id').delete((req, res) => {
  const element = db.seats.find(element => element.id == req.params.id);

  if(element){
    const newSeats = [];

    for(let seat of db.seats){
      if(seat.id != req.params.id){
        newSeats.push(seat);
      }
    }
    db.seats = newSeats;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'You have to provide correct ID!' });
  }
});

module.exports = router;
