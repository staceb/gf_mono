var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, id) {
    
    var deferred = Q.defer();
    
    if (c && id) {
        
        c.query('SELECT * FROM industry WHERE ID = ?', id ,function (err, result) {
            
            if (!err) {
                
                deferred.resolve(result);
            }
            else {
                
                deferred.reject(err);
            }
            
        });

    }
    else {
        
        deferred.reject('industry.find.byId: SQL Connection and id  mandatory');
    }
    
    
    return deferred.promise;
}