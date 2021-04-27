const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: '404 - Page not found.' });
});

const server = app.listen(process.env.PORT || 7000, () => {
  console.log('Server is running on port 7000: http://localhost:7000');
});

const io = socket(server);

io.on('connection', () => console.log('New socket!'));
