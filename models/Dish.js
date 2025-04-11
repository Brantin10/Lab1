const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ingredients: [String],
  preparationSteps: [String],
  cookingTime: Number,
  origin: String,
  spiceLevel: String,
  servings: Number,
}, { timestamps: true });

module.exports = mongoose.model('Dish', dishSchema);
