const Seat = require('../models/seat.model');
const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    console.log(await Seat.find());
    console.log('concert', await Concert.find());
    console.log('populate', await Seat.find().populate('concert'));

    res.json(await Seat.find().populate('concert'));
  }
  catch(err) {
    console.log(err);

    res.status(500).json({ message: err });
  }
};

exports.getSingle = async (req, res) => {
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
};

exports.post = async (req, res) => {
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
};

exports.put = async (req, res) => {
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
};

exports.delete = async (req, res) => {
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
};
