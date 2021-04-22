/* eslint eqeqeq: 'off' */

const express = require('express');
const { v4: uuidv4 } = require('uuid');
let db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  const element = db.testimonials.find(element => element.id == db.testimonials.id);
  res.json(element);
});

app.post('/testimonials', (req, res) => {
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

app.put('/testimonials/:id', (req, res) => {
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

app.delete('/testimonials/:id', (req, res) => {
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

app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
  const element = db.concerts.find(element => element.id == req.params.id);
  res.json(element);
});

app.post('/concerts', (req, res) => {
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

app.put('/concerts/:id', (req, res) => {
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

app.delete('/concerts/:id', (req, res) => {
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

app.get('/seats', (req, res) => {
  res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
  const element = db.seats.find(element => element.id == req.params.id);
  res.json(element);
});

app.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;

  if(day && seat && client && email){
    db.seats.push({
      id: uuidv4(),
      day,
      seat,
      client,
      email,
    });
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Youe can\'t leave any fields empty!' });
  }
});

app.put('/seats/:id', (req, res) => {
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

app.delete('/seats/:id', (req, res) => {
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

app.use((req, res) => {
  res.status(404).json({ message: '404 - Page not found.' });
});

app.listen(7000, () => {
  console.log('Server is running on port 7000: http://localhost:7000');
});
