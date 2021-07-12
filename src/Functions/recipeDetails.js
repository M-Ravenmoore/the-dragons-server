'use strict';

const axios= require("axios").default;


async function getRecipeDetails (request,response){
console.log(request.params)
//get spoonId or sId from request
  const sId = request.params.id;
  console.log(sId)

// check if recipe with sId is in db
// if in db asign results to resposne recipe : storedRecipe

// if not in db do this:

//set url for request
  let url = `https://api.spoonacular.com/recipes/${sId}/information?apiKey=${process.env.SPOON_API_KEY}&includeNutrition=false`;
  
//make request via axios  
  axios.get(url)
  .then(recipeDetails =>{
    // console.log(recipeDetails.data.extendedIngredients);
    const recipe = recipeDetails.data;
    const sendableRecipe = new Recipe(recipe);

    // save to DB here!!

    console.log(sendableRecipe);
    response.status(200).json({
      recipe : sendableRecipe  
    });
  })
}

//constructor for reshaping recipes for db and front end use
function Recipe (recipeData) {
  this.sId =recipeData.id;
  this.title = recipeData.title;
  this.time = recipeData.readyInMinutes ? recipeData.readyInMinutes : 'N/A';
  this.servings = recipeData.servings ? recipeData.servings : 'N/A';
  this.image = recipeData.image;
  this.vegetarian = `${recipeData.vegetarian}`;
  this.vegan = `${recipeData.vegan}`;
  this.instructions = recipeData.instructions;
  this.ingredients_string = recipeData.extendedIngredients.map(ingredient => ingredient.originalString)
  this.ingredients_name = recipeData.extendedIngredients.map(ingredient => ingredient.name);
  this.ingredients_unit = recipeData.extendedIngredients.map(ingredient => ingredient.unit);
  this.ingredients_amount = recipeData.extendedIngredients.map(ingredient => ingredient.amount);
  this.credit = recipeData.creditsText;
  this.source_name = recipeData.sourceName;
  this.source_url = recipeData.sourceUrl;
}

module.exports = getRecipeDetails;