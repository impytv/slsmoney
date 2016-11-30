'use strict';

var TABLE = 'users';

module.exports = class Users {
  constructor(db) {
    this.db = db;
  }

  createTableIfNeeded(event, context, callback) {
    this.db.createTable(TABLE, { hash: ['id', this.db.schemaTypes().string] },
    {read: 1, write: 1}, (err, details) => {
      if (err) {
        const response = {
          statusCode: 500,
          body: JSON.stringify({
            message: err
          })
        };

        callback(null, response);
      }
      else {
        const response = {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Table created'
          })
        };

        callback(null, response);
      }
    });
  }

  saveUser(event, context, callback) {
      var user = JSON.parse(event.body);
      this.db.putItem(TABLE, user, {}, (err, details) => {
        if (err) {
          const response = {
            statusCode: 500,
            body: JSON.stringify({
              message: err
            })
          };

          callback(null, response);
        }
        else {
          const response = {
            statusCode: 200,
            body: JSON.stringify({
              message: 'Saved'
            })
          };

          callback(null, response);
        }
      });
  }


  getUser(event, context, callback) {
    if (event && event.queryStringParameters && event.queryStringParameters.id) {
        this.db.getItem(TABLE, event.queryStringParameters.id, undefined, {}, (err, details) => {
          if (err) {
            const response = {
              statusCode: 500,
              body: JSON.stringify({
                message: err
              })
            };

            callback(null, response);
          }
          else {
            const response = {
              statusCode: 200,
              body: JSON.stringify(details)
            };

            callback(null, response);
          }
        });
      }
    }
  }
