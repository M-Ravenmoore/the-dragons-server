'use strict';

const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  sId: { type: String},
  image: { type: String},
  title: { type: String, required: true },
  servings: { type: Number},
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