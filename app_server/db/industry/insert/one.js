var mySQL = require('../../../db/db');
var Q = require('q');

module.exports = function (c, row){
    
    var deferred = Q.defer();    

    if (c && row) {
        
        var insert = { ID: row.id, NAME: row.name, SECTOR_ID: row.sectorId };

        c.query('INSERT INTO industry SET ?', insert , function (err, result) {
            
            if (!err) {
                
                deferred.resolve(result);
            }
            else {
                
                deferred.reject(err);
            }
            
        });

    }
    else {

        deferred.reject('industry.insert.one: SQL Connections and record to insert mandatory');
    }


    return deferred.promise;
}