'use strict';

const express = require('express');

const searchHandler = require('../Functions/search')
const getRecipe = require('../Functions/recipeDetails')

const spoonRouter = express.Router();

// spoon routes

spoonRouter.post('/', searchHandler);
spoonRouter.get('/details/:id', getRecipe );



module.exports = spoonRouter;