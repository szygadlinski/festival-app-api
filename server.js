const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Olivia Lee', text: 'This company is worth every coin!' },
  { id: 4, author: 'Barry Ross', text: 'They really know how to make you happy.' },
  { id: 5, author: 'Diane Carter', text: 'This company is worth every coin!' },
  { id: 6, author: 'Ralph Smith', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[req.params.id - 1]);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  if(author && text){
    db.push({
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
  const element = db.find(element => element.id == req.params.id);
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
  const element = db.find(element => element.id == req.params.id);

  if(element){
    const newDB = [];
    for(let element of db){
      if(element.id != req.params.id){
        newDB.push(element);
      }
    }
    db = newDB;
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
