var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, rows) {

    var deferred = Q.defer();

      if (c && rows) {

        c.query("INSERT INTO EXP_AVG (SYMBOL,DATE,STEXP1,STEXP2,STEXP3,STEXP4,STEXP5,LTEXP1,LTEXP2,LTEXP3,LTEXP4,LTEXP5,STEXP_MIN,STEXP_MAX,LTEXP_MIN,LTEXP_MAX,ALLEXP_MIN,ALLEXP_MAX,STEXP_DIST,LTEXP_DIST,ALLEXP_DIST,UPTREND,DOWNTREND) VALUES ?",
        [rows] , function (err, result) {

            if (!err) {

                deferred.resolve(result);
            }
            else {
  console.log(err)
                deferred.reject('EXP_AVG:'+err);
            }

        });
      }
      else {

        deferred.reject('EXP_AVG.insert.bulk: SQL Connections and records to insert mandatory');

      }


    return deferred.promise;
}
