var Q = require('q')
var yahoo = require("../modules/yahoo.js");
var weeklyGain = require("../modules/stats/weeklyGain.js");

// input = symbol, fromDate, toDate, frequency
// get stocks from feed, add statistics, save to db

module.exports = function(params){


    var deferred = Q.defer();


      var url = yahoo.buildUrl(params);

      yahoo.historicalQuotes(url, params.symbol)

    // .then(function(d){
    //
    //     var prev = d[0];
    //     return weeklyGain(d, prev);
    //  })
    .then(function(d){
    //    console.log('d:'+d);
          deferred.resolve(d);
    })
    .catch(function(err){
        console.log(err)
        deferred.reject(err);

    });

    return deferred.promise;

}
