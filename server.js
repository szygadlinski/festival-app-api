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
  res.json(db.testimonials[req.params.id - 1]);
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
    const newDB = [];
    for(let element of db.testimonials){
      if(element.id != req.params.id){
        newDB.push(element);
      }
    }
    db.testimonials = newDB;
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
