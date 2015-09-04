var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c) {
    
    var deferred = Q.defer();
    
    if (c) {
              
        c.query('SELECT * FROM sector', function (err, result) {
            
            if (!err) {
                
                deferred.resolve(result);
            }
            else {
                
                deferred.reject(err);
            }
            
        });

    }
    else {
        
        deferred.reject('sector.find.all: SQL Connection mandatory');
    }
    
    
    return deferred.promise;
}