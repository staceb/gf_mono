var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, rows) {

    var deferred = Q.defer();

      if (c && rows) {

        c.query("INSERT INTO weekly_stocks (SYMBOL,DATE,OPEN,HIGH,LOW,CLOSE,VOLUME,ADJCLOSE, MONTH, YEAR, RETURN_ABS, RETURN_PER, RETURN_ACCUM) VALUES ?",
        [rows] , function (err, result) {

            if (!err) {

                deferred.resolve(result);
            }
            else {

                deferred.reject(err);
            }

        });
      }
      else {

        deferred.reject('weekly_stocks.insert.bulk: SQL Connections and records to insert mandatory');

      }


    return deferred.promise;
}
