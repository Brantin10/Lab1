const mongoose = require('mongoose');
const Dish = require('./models/Dish'); // Assuming Dish model is in 'models/Dish.js'
const dotenv = require('dotenv');

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Sample data
    const dishes = [
      {
        name: "Spaghetti Carbonara",
        ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black Pepper"],
        preparationSteps: ["Boil pasta", "Fry pancetta", "Mix with eggs and cheese"],
        cookingTime: 20,
        origin: "Italy",
        spiceLevel: "Mild",
        servings: 2
      },
      {
        name: "Tacos",
        ingredients: ["Taco Shells", "Ground Beef", "Lettuce", "Cheese", "Tomato"],
        preparationSteps: ["Cook beef", "Fill taco shells", "Top with veggies"],
        cookingTime: 15,
        origin: "Mexico",
        spiceLevel: "Medium",
        servings: 4
      },
      {
        name: "Sushi",
        ingredients: ["Rice", "Nori", "Salmon", "Cucumber", "Soy Sauce"],
        preparationSteps: ["Cook rice", "Roll ingredients in nori"],
        cookingTime: 30,
        origin: "Japan",
        spiceLevel: "Mild",
        servings: 2
      },
      {
        name: "Pizza Margherita",
        ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Basil"],
        preparationSteps: ["Roll dough", "Top with sauce and cheese", "Bake"],
        cookingTime: 25,
        origin: "Italy",
        spiceLevel: "Mild",
        servings: 4
      },
      {
        name: "Pancakes",
        ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Baking Powder"],
        preparationSteps: ["Mix ingredients", "Fry pancakes on griddle"],
        cookingTime: 10,
        origin: "USA",
        spiceLevel: "None",
        servings: 4
      }
    ];

    // Insert the dishes
    await Dish.insertMany(dishes);
    console.log('Sample dishes inserted!');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });
