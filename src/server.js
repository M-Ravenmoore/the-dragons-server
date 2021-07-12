'use strict';

const express = require('express');
const cors = require('cors');
const v1Routes = require('./routes/v1.js');
const spoonRoutes = require('./routes/spoon')
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', homeHandler);
app.use('/api/v1', v1Routes);
app.use('/spoon/v1', spoonRoutes)

function homeHandler(request, response){
  response.status(200).send('Welcome to Dragons Server commands soon to come');
}


module.exports ={
  server: app,
  start: port => {
    if(!port){throw new Error('Missing start port!!');}
    app.listen(port, ()=> console.log(`CookFires Burning on Port ${port}`));
  },
};
