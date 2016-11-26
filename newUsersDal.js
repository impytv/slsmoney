'use strict';

var Promise = require('es6-promise').Promise;

var TABLE = 'users';

module.exports = class Users {
  constructor(db) {
    this.db = db;
  }

  createTableIfNeeded(event, context, callback) {
    this.db.createTable(TABLE, { hash: ['id', this.db.schemaTypes().string] },
    {read: 1, write: 1}, (err, details) => {
      callback();
    });
  }

  saveUser(event, context, callback) {
      var user = JSON.parse(event.body);
      this.db.putItem(TABLE, user, {}, (err, details) => {        
        callback(err, details);
      });
  }


  getUser(event, context, callback) {
    if (event && event.queryStringParameters && event.queryStringParameters.id) {
        this.db.getItem(TABLE, event.queryStringParameters.id, undefined, {}, (err, details) => {
          callback(err, details);
        });
      }
    }
  }
