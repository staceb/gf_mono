var Q = require('q');
var mySQL = require('../../app_server/db/db');
var symbol = require('../../app_server/db/symbol/symbol.js');
var yahoo = require('../../app_server/modules/yahoo.js');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.get = function(req, res){

  var con;
  Q.try(function(){

      return mySQL.getConnection();
  })
  .then(function(c){

      con = c
      return symbol.find.bySymbol(con, 'YHOO');
//      return symbol.find.all(con);

  })
  .then(function(d){

      var promises = [];

      console.log(d.length)
      d.map(function(d, i){

        var deferred = Q.defer();
        promises.push(deferred.promise);

        var url = yahoo.buildUrl({symbol: d.SYMBOL, fromDate:d.LAST_DATE , toDate: new Date(), frequency: 'w'})

        yahoo.historicalQuotes(url, d.SYMBOL)
        .then(function(r){

            // console.log(r[0][0]);
            deferred.resolve(r);
        })
        .catch(function(err){

            console.log('error:'+err);
            deferred.resolve();
        });

      });

      return Q.all(promises);

    })
    .then(function(d){

        sendJSONresponse(res, 200, d);
    });

}
