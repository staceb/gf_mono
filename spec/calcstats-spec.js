require('../app.js');
var yahoo = require('../app_server/modules/yahoo.js');
var stats = require('../app_server/modules/stats.js');
var symbol = require('../app_server/db/symbol/symbol.js');
var weekly_average = require('../app_server/db/weekly_average/weekly_average.js');
var weekly_stock = require('../app_server/db/weekly_stock/weekly_stock.js');
var mySQL = require('../app_server/db/db');
var request = require('request');
var Q = require('q');
var fs = require('fs');

describe('get latest stock from csv and save docs', function () {

    var con;
    it('should get new records from feed ', function (done) {

      Q.try(function () {

    //      return mySQL.getConnection();
            return null;
      })
      // .then(function (c) {
      //     console.log('weekly_average.find.bySymbol')
      //     con = c;
      // //    return weekly_average.find.bySymbol(con, "MTX");
      //     return null;
      // })
      .then(function (d) {

console.log('yahoo.historicalQuotes')
console.log(JSON.stringify(d));
          var fromDate = new Date(1980, 0, 29);
          var pastDoc = null;

          if (d && d[0].DATE) {

              var day = 8 - d[0].date.getDay();
              fromDate = new Date(d.date.getTime() + (86400000 * day));
              pastDoc = d[0];
          }

          var qs = { symbol: 'MTX' , fromDate: fromDate , toDate: new Date(), frequency: 'w' };
          var url = yahoo.buildUrl(qs);
          console.log(url);

          return Q.all([yahoo.historicalQuotes(url, 'MTX'), pastDoc]);

        })
         .then(function (d) {

console.log('stats.calcStats');
            return stats.calcStats(d[0], d[1] , 'w');

        })
        .then(function (d){

            var data = d[0];
            console.log('LENGTH:'+d[0].length);
            // fs.writeFile("test.txt", d[0], function(err) {
            //     if(err) {
            //       return console.log(err);
            //       }
            //
            //       console.log("The file was saved!");
            // });

            return weekly_stock.insert.bulk(d[0]);
      //      return Q.all([weekly_stock.insert.bulk(c, data[0]), data[1], data[0][0][0], c]);

        })
        // .then(function (d){
        //
        //     console.log('symbol:'+d[2]);
        //
        //     return Q.all([weekly_average.remove.bySymbol(d[3], d[2]), d[1], d[3]]);
        //
        // })
        //  .then(function (d) {
        //
        //
        //     var s =  d[1].data.map(function(r) {
        //         var t = [d[1].symbol, d[1].date, r.col, r.arraySMA.join(','), r.sumSMA , r.arrayRTN.join(","), r.sumRTN, r.i]
        //         console.log('t:'+JSON.stringify(t));
        //         return t
        //
        //       });
        //
        //      return Q.all([weekly_average.insert.bulk(d[2], s), d[2]]);
        //
        // })
        .then(function (d) {

console.log('----------------insert complete----------------');
      //      d[1].release();
            done();
       })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
      //      con.release();
            done();
        });

    }, 100000000000);

});
