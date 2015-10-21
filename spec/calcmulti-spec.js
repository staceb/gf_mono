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

  it('should get new records from feed ', function (done) {

    var con;

    Q.try(function () {

        return mySQL.getConnection();
    })
    .then(function(c){

        con = c;
  //      return symbol.find.all(con);

        return [{SYMBOL: 'AEM'}];
    })
    .then(function(d){

      var promises = [];

      d.map(function(i){

          var deferred = Q.defer();
          promises.push(deferred.promise);

          weekly_average.find.bySymbol(con, i.SYMBOL)
          .then(function(d){

            var fromDate = yahoo.getNextDateWeekly(d);
            var latestDoc;

            d && d.date ? latestDoc = d: latestDoc = null;

            var qs = { symbol: i.SYMBOL , fromDate: fromDate , toDate: new Date(), frequency: 'w' };
            var url = yahoo.buildUrl(qs);
console.log(url);
            return Q.all([yahoo.historicalQuotes(url, i.SYMBOL), latestDoc]);

          })
          .then(function(d){

              if(d[0] && d[0].length > 0){

                  return stats.calcStats(d[0], d[1] , 'w');
              }
              else{

                    deferred.resolve();
              }




          })
          .then(function(d){
            // console.log('SIGNAL'+d[0][1][84])
            //   console.log('SHARES_BOUGHT'+d[0][1][85])
            //     console.log('VALUE_BOUGHT'+d[0][1][86])
            //       console.log('TOTAL_BOUGHT'+d[0][1][87])
            //         console.log('TOTAL_SHARES'+d[0][1][88])
            //           console.log('SHARES_SOLD'+d[0][1][89])
            //             console.log('VALUE_SOLD'+d[0][1][90])
            //               console.log('GAIN_ABS_TOTAL'+d[0][1][91])
            //                 console.log('GAIN_PER_TOTAL'+d[0][1][92])
            //                   console.log('PORTFOLIO_VAL'+d[0][1][93])
            //                     console.log('PORTFOLIO_RETURN'+d[0][1][94])
              // console.log(d[0][0].length)
        //       console.log(JSON.stringify(d[0][0]));
              return Q.all([weekly_stock.insert.bulk(con, d[0]), d[1]]);

          })
          .then(function(d){

              return Q.all([weekly_average.remove.bySymbol(con, i.SYMBOL), d[1]]);
          })
          .then(function(d){

            var w_avg =  d[1].data.map(function(r) {

                    var t = [d[1].symbol, d[1].date, r.col, r.arraySMA.join(','), r.sumSMA , r.arrayRTN.join(","), r.sumRTN, r.i]
                    return t
            });

            return weekly_average.insert.bulk(con, w_avg)

          })
          .then(function(d){

                  deferred.resolve();
          })
          .catch(function(err){

                console.log(err)
                deferred.resolve();
          });

      });

        return Q.all(promises);

    })
    .then(function(d){

      console.log('------------------------INSERT COMPLETE---------------------------')
      con.release();
      done();

    })
    .catch(function (err) {

        expect(error).toEqual('last promise returned error');
        done();

    });

  }, 1000000000000000000000000000000000000000000);

});
