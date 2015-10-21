var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, row) {

    var deferred = Q.defer();

      if (c && row) {

          c.query('UPDATE SYMBOL SET LAST_DATE = :lastDate WHERE SYMBOL = :symbol', row , function (err, result) {

              if (!err) {

                  deferred.resolve(result);
              }
              else {

                  console.log('update error:'+err);
                  deferred.reject(err);
              }

          });

      }
      else {

          deferred.reject('symbol.update.lastDateBySymbol: SQL Connection and id mandatory');
      }

    return deferred.promise;
}
