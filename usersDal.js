'use strict';

var config = require('./config.js');
var ddb = require('dynamodb').ddb(config);
var Promise = require('es6-promise').Promise;

var TABLE = 'users';

module.exports = {
  saveUser: (user) => {
    return new Promise((resolve, reject) => {
        ddb.putItem(TABLE, user, {}, (err, details) => {
          if (err) {
            console.log('Err');
            reject(err);
          }
          else {
            resolve(user);
          }
        });
    });
  },
  getUser: (id) => {
    return new Promise((resolve, reject) => {
      ddb.getItem(TABLE, id, undefined, {}, (err, details) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(details);
        }
      });
    });
  },
  createTableIfNeeded: () => {
    return new Promise((resolve, reject) => {
      ddb.createTable(TABLE, { hash: ['id', ddb.schemaTypes().string] },
                      {read: 1, write: 1}, (err, details) => {
                        resolve();
                      });
    });
  }
};
