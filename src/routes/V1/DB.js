'use strict';

const fs = require('fs');
const express = require('express');

// file requiremnts

const Collection = require('../../mongo-models/collector');

const router = express.Router();

// db routes

//this allows us to creat other dbs and have routes based on the file name of the rout model.. such as /recipes and /test both at api/v1/(foldername)

const models = new Map();
router.param('model', (request, respone, next) => {
  const modelName = request.params.model;
  // console.log( models, modelName)
  if (models.has(modelName)) {
    request.model = models.get(modelName);
    next();
  } else {
    const fileName = `${__dirname}/../../mongo-models/${modelName}/model.js`;
    // console.log(fileName)
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      models.set(modelName, new Collection(model));
      request.model = models.get(modelName);
      next();
    }
    else {
      next('Invalid Model');
    }
  }
});

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.get('/:model/search/:search', handleTitleSearch)
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function handleGetAll(request, respone) {
  let allRecords = await request.model.get();
  respone.status(200).json(allRecords);
}

async function handleTitleSearch(request, respone) {
  console.log("look at me",request.params)
  let title = `${request.params.search}`;
  console.log(title)
  let resultsByTitle = await request.model.getSearch(title);

  respone.status(200).json(resultsByTitle);
}
async function handleGetOne(request, respone) {
  const id = request.params.id;

  let theRecord = await request.model.get(id);
  respone.status(200).json(theRecord);
}

async function handleCreate(request, respone) {
  let obj = request.body;
  let newRecord = await request.model.create(obj);
  respone.status(201).json(newRecord);
}

async function handleUpdate(request, respone) {
  const id = request.params.id;
  const obj = request.body;
  let updatedRecord = await request.model.update(id, obj);
  respone.status(200).json(updatedRecord);
}

async function handleDelete(request, respone) {
  let id = request.params.id;
  let deletedRecord = await request.model.delete(id);
  respone.status(200).json(deletedRecord);
}

module.exports = router;