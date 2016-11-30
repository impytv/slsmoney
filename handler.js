'use strict';

var config = require('./config.js');
var db = require('dynamodb').ddb(config);
var UsersDal = require('./newUsersDal.js');

var usersDal = new UsersDal(db);

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.createTableIfNeeded = (event, context, callback) => {
    usersDal.createTableIfNeeded(event, context, callback);
};

module.exports.getUser = (event, context, callback) => {
  usersDal.getUser(event, context, callback);
};

module.exports.saveUser = (event, context, callback) => {
  usersDal.saveUser(event, context, callback);
};
