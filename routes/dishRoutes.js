const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');

router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dishes.' });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const dish = await Dish.findOne({ name: req.params.name });
    if (!dish) return res.status(404).json({ message: 'Dish not found.' });
    res.json(dish);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching dish.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const exists = await Dish.findOne({ name: req.body.name });
    if (exists) return res.status(409).json({ message: 'Dish already exists.' });

    const newDish = new Dish(req.body);
    await newDish.save();
    res.status(201).json(newDish);
  } catch (err) {
    res.status(400).json({ error: 'Invalid dish data.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Dish not found.' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Error updating dish.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Dish.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Dish not found.' });
    res.json({ message: 'Dish deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting dish.' });
  }
});

module.exports = router;
