# The-Dragon-Server

## Backend support for The Dragons Kitchen Web app. An API and Database connection

### Author: Matt Ravenmoore

### Version:

  - 1.0.0 ~~ basic api functionality achived 7/10/2021
  - 1.0.1 ~~ api call to spoon working and returning results 7/12/2021


### Links and Resources

[Production Front end](https://dragonkitchen.netlify.app/)
[development Front end](https://thedragonskitchen-dev.netlify.app/)
[development Server](https://dragons-server-dev.herokuapp.com/)
[Production server](https://the-dragons-server.herokuapp.com/)

### Setup

1. clone Repo to local.
1. install the Dependancies useing `npm install`
1. setup a mongodb database for local testing see [here](https://docs.mongodb.com/manual/installation/) to go to docs and follow instructions there.
1. set env Variables as follows:
  1. PORT=(normaly 3000 but any will work)
  1. MONGODB_URI=(your mongodb link)
  1. SPOON_API_KEY=(for testing get your own accout its free)

set up your model for what you want your routes to look like and take in data like... se existing Dragons folder under models for an example.

spoonacular api docs  = [spoon](https://spoonacular.com/food-api)

### Endpoints

- '/'  home/welcome/proof of life
- '/api/v1/recipes'  gets all recipes in dragon DB


#### How to initialize/run your application (where applicable)

run `npm start` to run localy on what ever port you set up express to take from your env;

#### Tests

testing notes to come

#### UML/site map
