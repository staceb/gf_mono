var Q = require('q')
var yahoo = require("../modules/yahoo.js");
var weeklyGain = require("../modules/stats/weeklyGain.js");

// input = symbol, fromDate, toDate, frequency
// get stocks from feed, add statistics, save to db

module.exports = function(params){

    console.log('yahoo started:'+params.symbol)
    var deferred = Q.defer();

    Q.try(function(){

      var url = yahoo.buildUrl(params);
      return yahoo.historicalQuotes(url, params.symbol);

    })
    .then(function(d){
      
        var prev = d[0];
        return weeklyGain(d, prev);
     })
    .then(function(d){

          deferred.resolve(d);
    })
    .catch(function(err){

        deferred.reject(err);

    });

    return deferred.promise;

}
