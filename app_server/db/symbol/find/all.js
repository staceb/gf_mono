var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c) {

    var deferred = Q.defer();

    if (c) {

          c.query('SELECT * FROM symbol', function (err, result) {

              if (!err) {

                  deferred.resolve(result);
              }
              else {

                  deferred.reject('symbol.find.all:'+err);
              }

          });

      }
      else {

          deferred.reject('symbol.find.all: SQL Connection mandatory');
      }

    return deferred.promise;
}
