var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, rows) {

    var deferred = Q.defer();

      if (c && rows) {

        c.query("INSERT INTO MOVING_AVG_VAR (SYMBOL,DATE,COL,ARR_SMA,SUM_SMA, ARR_RTN, SUM_RTN, PERIOD) VALUES ?",
        [rows] , function (err, result) {

            if (!err) {

                deferred.resolve(result);
            }
            else {
                console.log(err)
                deferred.reject('moving_avg_var'+err);
            }

        });
      }
      else {

        deferred.reject('moving_avg_var.insert.bulk: SQL Connections and records to insert mandatory');

      }


    return deferred.promise;
}
