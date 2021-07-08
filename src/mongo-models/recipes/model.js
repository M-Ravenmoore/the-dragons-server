'use strict';

const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  spoonId: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  servings: { type: Number, required: true},
  prepTime: { type: String},
  cookTime: { type: String},
  vegetarian: { type: Boolean},
  vegan: { type: Boolean},
  sourceName: { type: String},
  souceUrl:{ type: String},
  ingredientsName: { type: Array},
  ingredientsAmount: { type: Array},
  ingredientsUnit : { type: Array},
  ingredientsString : { type: Array},
  instructions: { type: String},
  saved_by: { type: Array},
  rateing : { type: Number},
  reviews : { type: Array}
});

const recipeModel = mongoose.model('recipe', recipeSchema);

module.exports = recipeModel;