var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, symbol) {
    
    var deferred = Q.defer();
    
    if (c && symbol) {
        
        c.query('SELECT * FROM symbol WHERE SYMBOL = ?', symbol ,function (err, result) {
            
            if (!err) {
                
                deferred.resolve(result);
            }
            else {
                
                deferred.reject(err);
            }
            
        });

    }
    else {
        
        deferred.reject('symbol.find.bySymbol: SQL Connection and id  mandatory');
    }
    
    
    return deferred.promise;
}