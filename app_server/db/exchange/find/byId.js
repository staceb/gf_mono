﻿var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, id) {
    
    var deferred = Q.defer();
    
    if (c && id) {
        
        c.query('SELECT * FROM exchange WHERE ID = ?', id ,function (err, result) {
            
            if (!err) {
                
                deferred.resolve(result);
            }
            else {
                
                deferred.reject(err);
            }
            
        });

    }
    else {
        
        deferred.reject('exchange.find.byId: SQL Connection and id  mandatory');
    }
    
    
    return deferred.promise;
}