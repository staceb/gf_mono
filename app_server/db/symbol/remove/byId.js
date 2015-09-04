var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, symbol) {
    
    var deferred = Q.defer();
    
    if (c && id) {
        
        c.query('DELETE FROM symbol WHERE SYMBOL = ?', symbol , function (err, result) {
            
            if (!err) {
                
                deferred.resolve(result);
            }
            else {
                
                deferred.reject(err);
            }
            
        });

    }
    else {
        
        deferred.reject('symbol.remove.bySymbol: SQL Connection and symbol mandatory');
    }
    
    
    return deferred.promise;
}