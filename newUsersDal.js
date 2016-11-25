'use strict';

var Promise = require('es6-promise').Promise;

var TABLE = 'users';

module.exports = class Users {
  constructor(db) {
    this.db = db;
  }

  createTableIfNeeded(event, context, callback) {
    callback(new Promise((resolve, reject) => {
      ddb.createTable(TABLE, { hash: ['id', ddb.schemaTypes().string] },
                      {read: 1, write: 1}, (err, details) => {
                        resolve();
                      });
    }));
  }

  saveUser(event, context, callback) {
    callback(new Promise((resolve, reject) => {
        var user = JSON.parse(event.body);
        ddb.putItem(TABLE, user, {}, (err, details) => {
          if (err) {
            console.log('Err');
            reject(err);
          }
          else {
            resolve(user);
          }
        });
    }));
  }

  getUser(event, context, callback) {
    if (event && event.queryStringParameters && event.queryStringParameters.id) {
      callback(new Promise((resolve, reject) => {
        this.db.getItem(TABLE, event.queryStringParameters.id, undefined, {}, (err, details) => {
          console.log(err);
          console.log(details);
          if (err) {
            reject(err);
          }
          else {
            resolve(details);
          }
        });
      }));
    }
  }
}
