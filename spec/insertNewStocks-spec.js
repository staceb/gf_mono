require('../app.js');
var Q = require('q');
var symbol = require('../app_server/db/symbol/symbol.js');
var insertNew = require('../app_server/process/insertNewStocks.js');
var mySQL = require('../app_server/db/db');
var date = require('../app_server/modules/dates.js');
var yahoo = require('../app_server/modules/yahoo.js');
describe('insertNewStocks', function () {

      it("should insert successfully", function (done) {

            var con;
            Q.try(function(){

                return mySQL.getConnection();
            })
            .then(function(c){

                con = c
          //      return symbol.find.bySymbol(con, 'YHOO');
                return symbol.find.all(con);

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

          //        console.log(d[0]);
                  done();
            })
            .catch(function(err){

                    console.log(err);
                    done();
            });

      }, 1000000000000000000000000000000000000);


});
