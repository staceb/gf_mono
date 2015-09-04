var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c) {
    
    var deferred = Q.defer();
    
    if (c) {
        
        c.query('DELETE FROM exchange', function (err, result) {
            
            if (!err) {
                
                deferred.resolve(result);
            }
            else {
                
                deferred.reject(err);
            }
            
        });

    }
    else {
        
        deferred.reject('exchange.find.all: SQL Connection mandatory');
    }
    
    
    return deferred.promise;
}