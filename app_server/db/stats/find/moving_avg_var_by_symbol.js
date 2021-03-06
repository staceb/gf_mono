var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, symbol) {

    var deferred = Q.defer();

    if (c && symbol) {

        c.query('SELECT * FROM MOVING_AVG_VAR WHERE SYMBOL = ? ORDER BY SYMBOL, DATE, PERIOD', symbol ,function (err, result) {
            if (!err) {

              if(result && result.length > 0 && result[0].DATE){

                var mapped  = { symbol: result[0].SYMBOL, date: result[0].DATE};

                mapped.data =  result.map(function(d){

                      return {
                        col: d.COL,
                        arraySMA: d.ARR_SMA.split(','),
                        sumSMA: d.SUM_SMA,
                        arrayRTN: d.ARR_RTN.split(','),
                        sumRTN: d.SUM_RTN,
                        i: d.PERIOD
                      }
                  });

                  deferred.resolve(mapped);

              }
              else{
                deferred.resolve(null);
              }

            }
            else {
                deferred.reject(err);
            }

        });

    }
    else {

        deferred.reject('moving_avg_var.find.bySymbol: SQL Connection and id  mandatory');
    }



    return deferred.promise;
}
