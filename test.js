'use strict';

var config = require('./config.js');
var db = require('dynamodb').ddb(config);
var User = require('./newUsersDal.js');
var usersDal = new User(db);

var userObject = {
  id : 'doh',
  amount :1002
};


var event = {
  queryStringParameters : {
    id : 'doh'
  },
  body : JSON.stringify(userObject)
};




//event.queryStringParameters.id

usersDal.createTableIfNeeded(event, this, (createError, createResult) => {
  console.log('createTableIfNeeded done');
  console.log(createResult);
  usersDal.saveUser(event, this, (saveError, saveResult) => {
    console.log('saveUser done');
    console.log(saveResult);
    usersDal.getUser(event, this, (getError, getResult) => {
        console.log(getResult);
    });
  });
});
