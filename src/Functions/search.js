'use strict';

const axios = require('axios').default
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

module.exports = searchHandler;