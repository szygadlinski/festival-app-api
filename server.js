const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Olivia Lee', text: 'This company is worth every coin!' },
  { id: 4, author: 'Barry Ross', text: 'They really know how to make you happy.' },
  { id: 5, author: 'Diane Carter', text: 'This company is worth every coin!' },
  { id: 6, author: 'Ralph Smith', text: 'They really know how to make you happy.' },
];

app.listen(7000, () => {
  console.log('Server is running on port 7000: http://localhost:7000');
});
