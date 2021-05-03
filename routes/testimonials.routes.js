/* eslint eqeqeq: 'off' */

const express = require('express');
const Testimonial = require('../models/testimonial.model');

const router = express.Router();

router.get('/testimonials', async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/testimonials/random', async (req, res) => {
  try {
    const count = Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const test = await Testimonial.findOne().skip(rand);
    if(!test) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(test);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/testimonials/:id', async (req, res) => {
  try {
    const test = await Testimonial.findById(req.params.id);
    if(!test) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(test);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/testimonials', async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({
      author: author,
      text: text,
    });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/testimonials/:id', async (req, res) => {
  try {
    const test = await Testimonial.findById(req.params.id);
    if(!test) {
      res.status(404).json({ message: 'Not found' });
    } else {
      const { author, text } = req.body;
      await Testimonial.updateOne({ _id: req.params.id }, { $set: {
        author: author,
        text: text,
      }});
      res.json({ 
        message: 'OK',
        updatedTestimonial: await Testimonial.findById(req.params.id),
      });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/testimonials/:id', async (req, res) => {
  try {
    const test = await Testimonial.findById(req.params.id);
    if(!test) {
      res.status(404).json({ message: 'Not found' });
    } else {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ 
        message: 'OK',
        deletedTestimonial: await test,
      });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
