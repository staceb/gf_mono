require('../app.js');
var yahoo = require('../app_server/modules/yahoo.js');
var stats = require('../app_server/modules/stats.js');
var symbol = require('../app_server/db/symbol/symbol.js');
var weekly_average = require('../app_server/db/weekly_average/weekly_average.js');
var weekly_stock = require('../app_server/db/weekly_stock/weekly_stock.js');
var mySQL = require('../app_server/db/db');
var request = require('request');
var Q = require('q');

describe('get latest stocks from csv and save docs', function () {

  var con;
  var tempStock = [];
  var stockInsert = [];
  var averages = [];
  var symbols = [];

  it('should get new records from feed ', function (done) {

    Q.try(function () {

        return mySQL.getConnection();

    })
    .then(function (c) {
    //    console.log('1 CALLED!')
        con = c;

        return symbol.find.all(con);

    })
    .then(function (d) {

    //   console.log('2 CALLED!')
        var s = d[0];
        var promises = [];

        d.map(function(i){

        //   console.log('2.1 CALLED!:'+i.SYMBOL)
            var deferred = Q.defer();
            promises.push(deferred.promise);

            weekly_average.find.bySymbol(con, i.SYMBOL)
            .then(function(d){

        //           console.log('2.2 CALLED!:'+i.SYMBOL)
                var fromDate = new Date(1980, 0, 29);
                var pastDoc = null;

                if (d && d.DATE) {

                    var day = 8 - d[0].date.getDay();
                    fromDate = new Date(d.date.getTime() + (86400000 * day));
                    pastDoc = d;
                }

                var qs = { symbol: i.SYMBOL , fromDate: fromDate , toDate: new Date(), frequency: 'w' };
                var url = yahoo.buildUrl(qs);
          //      console.log(url);

                return Q.all([yahoo.historicalQuotes(url, i.SYMBOL), pastDoc]);

            })
            .then(function(d){

            //      console.log('2.3 CALLED!'+d[0][0].symbol)
                  return stats.calcStats(d[0], d[1] , 'w');

            })
            .then(function(d){

              //    console.log('2.4 CALLED!'+d[0][0][0]);
                  if(tempStock.length < 1000){

                    tempStock = tempStock.concat(d[0]);

                  }
                  else{

                    stockInsert.push(tempStock);
                    tempStock = d[0];

                  }



                  var s =  d[1].data.map(function(r) {

                      var t = [d[1].symbol, d[1].date, r.col, r.arraySMA.join(','), r.sumSMA , r.arrayRTN.join(","), r.sumRTN, r.i]
                      return t

                    });

                  symbols = symbols.concat(d[0][0][0]);
                  averages = averages.concat(s);
                //    console.log('2.4 CALLED end!')
                  deferred.resolve();

            //      return Q.all([weekly_stock.insert.bulk(con, d[0]), d[1], d[0][0][0]]);

          })
          .catch(function (err) {

              console.log('promise returned error:'+i.SYMBOL+' '+err);
                deferred.resolve();
            //  done();

          });
          //   .then(function(d){
          //
          // //        return Q.all([weekly_average.remove.bySymbolMany(con, d[2]), d[1]]);
          //
          //   })
          //   .then(function (d) {
          //
          //      var s =  d[1].data.map(function(r) {
          //          var t = [d[1].symbol, d[1].date, r.col, r.arraySMA.join(','), r.sumSMA , r.arrayRTN.join(","), r.sumRTN, r.i]
          //   //       console.log('t:'+JSON.stringify(t));
          //          return t
          //
          //        });
          //
          //       return weekly_average.insert.bulk(con, s);
          //
          //  })
          //  .then(function (d) {
          //
          //      deferred.resolve(d);
          //  });

      //     console.log('defered:'+ promises);


        });

          return Q.all(promises);


    })
    .then(function(d){
           //console.log(stockInsert);
           console.log('insert CALLED!'+stockInsert[0][0]);

          var promises = [];

          stockInsert.map(function(d){

            var deferred = Q.defer;

            promises.push(deferred.promise);

            weekly_stock.insert.bulk(con, d)
            .then(function(d){

                deferred.resolve();

            });

          })
          .catch(function (err) {

                console.log('promise returned error: '+err);
                deferred.resolve();
            //  done();

          });

          return Q.all(promises);


    })
    .then(function(d){

        console.log('remove CALLED!')
    //    console.log(symbols)
        return weekly_average.remove.bySymbolMany(con, symbols);

    })
    .then(function(d){

         console.log('2nd insert CALLED!')
        return weekly_average.insert.bulk(con, averages);

    })
    .then(function (d) {

       console.log('3 CALLED!')
       console.log('INSERTS COMPLETE!!!!!!!!!!!!!!!!!!!!!!!!!!')
       console.log('stockInsert:'+stockInsert[0]);
       console.log('symbols:'+symbols[0]);
       console.log('averages:'+averages[0]);
       con.release();

       expect(d.length).toBeGreaterThan(1);
       done();

   })
    .catch(function (error) {

        expect(error).toEqual('promise returned error');
        done();

    });

  }, 100000000000000000000000000000000);


});
