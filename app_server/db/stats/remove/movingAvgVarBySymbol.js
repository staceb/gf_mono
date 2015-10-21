var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, symbol) {

    var deferred = Q.defer();

      if (c && symbol) {

          c.query('DELETE FROM MOVING_AVG_VAR WHERE SYMBOL = ?', symbol , function (err, result) {

              if (!err) {

                  deferred.resolve(result);
              }
              else {

                  console.log('remove error:'+err);
                  deferred.reject(err);
              }

          });

      }
      else {

          deferred.reject('exchange.delete.byId: SQL Connection and id mandatory');
      }


    return deferred.promise;
}
