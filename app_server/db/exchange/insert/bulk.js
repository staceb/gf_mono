var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, rows) {
    
    var deferred = Q.defer();
    
    if (c && rows) {

        c.query('INSERT INTO exchange (ID, NAME, CITY, COUNTRY) VALUES ?', [rows] , function (err, result) {
            
            if (!err) {
                
                deferred.resolve(result);
            }
            else {
                
                deferred.reject(err);
            }
            
        });
    }
    else {

        deferred.reject('exchange.insert.bulk: SQL Connections and records to insert mandatory');

    }  
    
    return deferred.promise;
}