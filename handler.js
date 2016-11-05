'use strict';

var usersDal = require('./usersDal.js');

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
    usersDal.createTableIfNeeded().then(() => {
      const response = {
        statusCode: 200,
        body: 'Table created'
      };

      callback(null, response);
    });
};

module.exports.getUser = (event, context, callback) => {
  if (event.queryStringParameters && event.queryStringParameters.id) {
    usersDal.getUser(event.queryStringParameters.id).then((user) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(user)
      };

      callback(null, response);
    });
  }
  else {
    const response = {
      statusCode: 200,
      body: JSON.stringify(message: 'User id missing')
    };

    callback(null, response);
  }
};

module.exports.saveUser = (event, context, callback) => {
  var user = JSON.parse(event.body);
    usersDal.saveUser(user).then((user) => {
      const response = {
        statusCode: 200,
        body: 'User saved'
      };

      callback(null, response);
    }, (error) => {
      const response = {
        statusCode: 500,
        body: 'User not saved'
      };

      console.log(error);
      callback(null, response);
    });
  }
  else {
    const response = {
      statusCode: 404,
      body: JSON.stringify(message: 'User id missing')
    };

    callback(null, response);
  }
};
