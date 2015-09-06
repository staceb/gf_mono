var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, symbols) {

    var deferred = Q.defer();

    if (c && symbols) {

        c.query('DELETE FROM weekly_stocks_average WHERE SYMBOL IN (?)', symbols , function (err, result) {

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
