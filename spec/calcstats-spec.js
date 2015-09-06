require('../app.js');
var yahoo = require('../app_server/modules/yahoo.js');
var stats = require('../app_server/modules/stats.js');
var symbol = require('../app_server/db/symbol/symbol.js');
var weekly_average = require('../app_server/db/weekly_average/weekly_average.js');
var weekly_stock = require('../app_server/db/weekly_stock/weekly_stock.js');
var mySQL = require('../app_server/db/db');
var request = require('request');
var Q = require('q');

describe('get latest stock from csv and save docs', function () {

    var con;
    it('should get new records from feed ', function (done) {

      Q.try(function () {

          return mySQL.getConnection();

      })
      .then(function (c) {

          con = c;
          return Q.all([weekly_average.find.bySymbol(c, "DIS"), con]);

      })
      .then(function (d) {

          var fromDate = new Date(1980, 0, 29);
          var pastDoc = null;

          if (d[0] && d[0].DATE) {

              var day = 8 - d[0].date.getDay();
              fromDate = new Date(d.date.getTime() + (86400000 * day));
              pastDoc = d[0];
          }

          var qs = { symbol: 'DIS' , fromDate: fromDate , toDate: new Date(), frequency: 'w' };
          var url = yahoo.buildUrl(qs);
          console.log(url);

          return Q.all([yahoo.historicalQuotes(url, 'DIS'), pastDoc]);

        })
         .then(function (d) {

            console.log('URL CALLED');
        //    console.log('THIRD CALLED:'+JSON.stringify(d[0][0]));

            return stats.calcStats(d[0], d[1] , 'w');

        })
        .then(function (d){

            return Q.all([weekly_stock.insert.bulk(con, d[0]), d[1], d[0][0][0]]);

        })
        .then(function (d){

            console.log('symbol:'+d[2]);

            return Q.all([weekly_average.remove.bySymbol(con, d[2]), d[1]]);

        })
         .then(function (d) {


            var s =  d[1].data.map(function(r) {
                var t = [d[1].symbol, d[1].date, r.col, r.arraySMA.join(','), r.sumSMA , r.arrayRTN.join(","), r.sumRTN, r.i]
                console.log('t:'+JSON.stringify(t));
                return t

              });

             return weekly_average.insert.bulk(con, s);

        })
        .then(function (d) {

            console.log('5th CALLED:'+JSON.stringify(d));
            con.release();
            done();
       })

        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            done();
        });

    }, 10000);

});
