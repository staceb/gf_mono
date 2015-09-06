var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, rows) {

    var deferred = Q.defer();

    if (c && rows) {

        c.query("INSERT INTO weekly_stocks_average (SYMBOL, DATE, COL, ARR_SMA, SUM_SMA,ARR_RTN, SUM_RTN, PERIOD) VALUES ?", [rows] , function (err, result) {

            if (!err) {

                deferred.resolve(result);
            }
            else {

                deferred.reject(err);
            }

        });
    }
    else {

        deferred.reject('weekly_stocks_average.insert.bulk: SQL Connections and records to insert mandatory');

    }

    return deferred.promise;
}
