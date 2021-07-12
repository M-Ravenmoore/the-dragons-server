'use strict';

const fs = require('fs');
const express = require('express');
const Collection = require('../mongo-models/collector');
const axios = require('axios').default

const router = express.Router();

const models = new Map();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (models.has(modelName)) {
    req.model = models.get(modelName);
    next();
  } else {
    const fileName = `${__dirname}/../mongo-models/${modelName}/model.js`;
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      models.set(modelName, new Collection(model));
      req.model = models.get(modelName);
      next();
    }
    else {
      next('Invalid Model');
    }
  }
});
// action routes
router.post('/search', searchHandler);


// db routes

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

// make this check if 
async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

async function searchHandler (request,response){

  console.log( request.query)
  console.log('search keyword : ',request.query.search)
  console.log('search type : ',request.query.type)
  console.log('return howmany? : ',request.query.count)


  const queryContent = request.query.search;
  const queryType = request.query.type;
  const queryCount = request.query.count;
  const queryVegi = request.query.vegetarian;
  const queryVegan = request.query.vegan;
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOON_API_KEY}&
  instructionsRequired=true&addRecipeInformation=true&number=${queryCount}&analyzedInstructions&sort=random`;
  if (queryType === 'query'){ url += `&query=${queryContent}`}
  if (queryType === 'cuisine'){url += `&cuisine=${queryContent}`}
  if (queryType === 'author'){url += `&author=${queryContent}`}
  if (queryVegi ){url += `&diet=${queryVegi}`}
  if (queryVegan ){url += `&diet=${queryVegan}`}

  // change this to axios!

  axios(url)
    .then(results => {
      console.log(results.data)
      const resultsArr = results.data.results;
      const sendableResults = resultsArr.map(resultData => new ResultItem(resultData));
      response.status(200).json({resultItems : sendableResults})
    })
}

function ResultItem (result) {
  this.spoon_id = result.id;
  this.title = result.title;
  this.image = result.image ? result.image.replace(/^http:\/\//i, 'https://') : 'tempimg.jpg';
  this.vegetarian = `${result.vegetarian}`;
  this.vegan = `${result.vegan}`;
  this.time = result.readyInMinutes ? result.readyInMinutes : 'not listed';
  this.servings = result.servings ? result.servings : 'not listed';
}


module.exports = router;