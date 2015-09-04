var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, name) {
    
    var deferred = Q.defer();
    
    if (c && name) {
        
        c.query('SELECT * FROM sector WHERE NAME = ?', name , function (err, result) {
            
            if (!err) {
                
                deferred.resolve(result);
            }
            else {
                
                deferred.reject(err);
            }
            
        });

    }
    else {
        
        deferred.reject('sector.find.byId: SQL Connection and name mandatory');
    }
    
    
    return deferred.promise;
}