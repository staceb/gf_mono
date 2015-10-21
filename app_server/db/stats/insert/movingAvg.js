var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, rows) {

    var deferred = Q.defer();

      if (c && rows) {

        c.query("INSERT INTO MOVING_AVG (SYMBOL,DATE,STSMA1_VAL,STSMA1_STD,	STRTN1_VAL,	STRTN1_STD,	STSMA1_TREND,	STSMA2_VAL,	STSMA2_STD,	STRTN2_VAL,	STRTN2_STD,	STSMA2_TREND,	STSMA3_VAL,	STSMA3_STD,	STRTN3_VAL,	STRTN3_STD,	STSMA3_TREND,	STSMA4_VAL,	STSMA4_STD,	STRTN4_VAL,	STRTN4_STD,	STSMA4_TREND,	STSMA5_VAL,	STSMA5_STD,	STRTN5_VAL,	STRTN5_STD,	STSMA5_TREND,	LTSMA1_VAL,	LTSMA1_STD,	LTRTN1_VAL,	LTRTN1_STD,	LTSMA1_TREND,	LTSMA2_VAL,	LTSMA2_STD,	LTRTN2_VAL,	LTRTN2_STD,	LTSMA2_TREND,	LTSMA3_VAL,	LTSMA3_STD,	LTRTN3_VAL,	LTRTN3_STD,	LTSMA3_TREND,	LTSMA4_VAL,	LTSMA4_STD,	LTRTN4_VAL,	LTRTN4_STD,	LTSMA4_TREND,	LTSMA5_VAL,	LTSMA5_STD,	LTRTN5_VAL,	LTRTN5_STD,	LTSMA5_TREND) VALUES ?",
        [rows] , function (err, result) {

            if (!err) {

                deferred.resolve(result);
            }
            else {
  console.log(err)
                deferred.reject('moving_avg:'+err);
            }

        });
      }
      else {

        deferred.reject('moving_avg.insert.bulk: SQL Connections and records to insert mandatory');

      }


    return deferred.promise;
}
