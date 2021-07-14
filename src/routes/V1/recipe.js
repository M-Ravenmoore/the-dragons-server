'use strict';

const express = require('express');

const searchHandler = require('../../Functions/search')
const getRecipe = require('../../Functions/recipeDetails')

const recipeRouter = express.Router();

// recipe routes

recipeRouter.get('/', searchHandler);
recipeRouter.get('/details/:id', getRecipe );



module.exports = recipeRouter;