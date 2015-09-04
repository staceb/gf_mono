var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c) {
    
    var deferred = Q.defer();
    
    if (c) {
        
        c.query('DELETE FROM industry', function (err, result) {
            
            if (!err) {
                
                deferred.resolve(result);
            }
            else {
                
                deferred.reject(err);
            }
            
        });

    }
    else {
        
        deferred.reject('industry.remove.all: SQL Connection mandatory');
    }
    
    
    return deferred.promise;
}