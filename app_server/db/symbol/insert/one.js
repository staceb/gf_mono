var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, row){

    var deferred = Q.defer();

    if (c && row) {

        var insert = { SYMBOL: row.symbol, NAME: row.name , INDUSTRY_ID : row.industryId, SECTOR_ID: row.sectorId, EXCHANGE_ID: row.exchangeId, LAST_DATE: row.lastDate };

        c.query('INSERT INTO symbol SET ?', insert , function (err, result) {

            if (!err) {

                deferred.resolve(result);
            }
            else {

                deferred.reject(err);
            }

        });

    }
    else {

        deferred.reject('symbol.insert.one: SQL Connections and record to insert mandatory');
    }


    return deferred.promise;
}
