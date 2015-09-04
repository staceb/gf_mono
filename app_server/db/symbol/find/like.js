var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, query) {
    
    var deferred = Q.defer();
    
    if (c && query) {
        
        c.query('SELECT SYMBOL, NAME FROM symbol WHERE SYMBOL LIKE ? OR NAME LIKE ?',['%'+ query +'%', '%' + query + '%'] , function (err, result) {
            
            if (!err) {
                
                deferred.resolve(result);
            }
            else {
                
                deferred.reject(err);
            }
            
        });

    }
    else {
        
        deferred.reject('symbol.find.like: SQL Connection and name mandatory');
    }
    
    
    return deferred.promise;
}