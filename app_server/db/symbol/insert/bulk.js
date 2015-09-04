var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, rows) {
    
    var deferred = Q.defer();
    
    if (c && rows) {

        c.query('INSERT INTO symbol (SYMBOL, NAME, INDUSTRY_ID, SECTOR_ID, EXCHANGE_ID) VALUES ?', [rows] , function (err, result) {
            
            if (!err) {
                
                deferred.resolve(result);
            }
            else {
                
                deferred.reject(err);
            }
            
        });
    }
    else {

        deferred.reject('symbol.insert.bulk: SQL Connections and records to insert mandatory');

    }  
    
    return deferred.promise;
}