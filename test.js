'use strict';

var config = require('./config.js');
var db = require('dynamodb').ddb(config);
var User = require('./newUsersDal.js');
var usersDal = new User(db);

var userObject = {
  id : 'doh',
  amount :1000
};


var event = {
  queryStringParameters : {
    id : 'doh'
  },
  body : JSON.stringify(userObject)
};




//event.queryStringParameters.id

usersDal.createTableIfNeeded(event, this, (createPromise) => {
  createPromise.then(() => {
    console.log('createTableIfNeeded done');
    usersDal.saveUser(event, this, (savePromise) => {
      savePromise.then((saveResult) => {
        console.log('saveUser done');
        console.log(saveResult);
        usersDal.getUser(event, this, (promise) => {
          promise.then((result) => {
            console.log(result);
          });
        });
      });
    });
  });
}
);
