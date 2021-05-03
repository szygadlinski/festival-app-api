/* eslint eqeqeq: 'off' */

const express = require('express');
const Seat = require('../models/seat.model');

const router = express.Router();

router.get('/seats', async (req, res) => {
  try {
    res.json(await Seat.find().populate('concert'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id).populate('concert');
    if(!seat) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(seat);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/seats', async (req, res) => {
  try {
    const { seat, client, email, concert } = req.body;
    const newSeat = new Seat({
      seat: seat,
      client: client,
      email: email,
      concert: concert,
    });
    await newSeat.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) {
      res.status(404).json({ message: 'Not found' });
    } else {
      const { seat, client, email, concert } = req.body;
      await Seat.updateOne({ _id: req.params.id }, { $set: {
        seat: seat,
        client: client,
        email: email,
        concert: concert,
      }});
      res.json({ 
        message: 'OK',
        updatedSeat: await Seat.findById(req.params.id).populate('concert'),
      });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id).populate('concert');
    if(!seat) {
      res.status(404).json({ message: 'Not found' });
    } else {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({
        message: 'OK',
        deletedSeat: await seat,
      });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
