require('../app.js');
var yahoo = require('../app_server/modules/yahoo.js');
var gain = require('../app_server/modules/stats/weekly_gain.js');
var exp = require('../app_server/modules/stats/exp_average.js');
var sim = require('../app_server/modules/stats/simple_average.js');
var Q = require('q');
var weekly_stock = require('../app_server/db/weekly_stocks/weekly_stocks.js');
var mySQL = require('../app_server/db/db');
var stat = require('../app_server/db/stats/stats.js');

describe('calc weekly gain', function () {

  it('should get new records from feed and calc weekly gain', function (done) {
      var con;

      Q.try(function(d){

          return mySQL.getConnection();

      })
      .then(function(c){

        con = c;
        var qs = { symbol: 'MTX' , fromDate: new Date(1980, 0, 29) , toDate: new Date(), frequency: 'w' };
        var url = yahoo.buildUrl(qs);

        return yahoo.historicalQuotes(url, 'MTX');

      })
      .then(function(d){

            var prev = d[0];
            var rows =  gain(d, prev);

            return Q.all([d, weekly_stock.insert.bulk(con, rows)]);

      })
      .then(function(d){

          var exppre = [d[0][0][0], d[0][0][1], d[0][0][7],d[0][0][7],d[0][0][7],d[0][0][7],d[0][0][7],d[0][0][7],
          d[0][0][7],d[0][0][7],d[0][0][7],d[0][0][7],
          d[0][0][7], d[0][0][7],d[0][0][7],d[0][0][7],d[0][0][7],d[0][0][7], 0,0,0,0,0];

          var smapre = {symbol: d[0][0][0], date: d[0][0][1],
          data: [{col: 'STSMA1', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0, i: 1},
          {col: 'STSMA2', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 2},
          {col: 'STSMA3', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 5},
          {col: 'STSMA4', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 10},
          {col: 'STSMA5', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 40},
          {col: 'LTSMA1', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 50},
          {col: 'LTSMA2', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 60},
          {col: 'LTSMA3', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 80},
          {col: 'LTSMA4', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 100},
          {col: 'LTSMA5', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0, i: 200}] };

          var ema = exp(d[0], exppre);
          var sma = sim(d[0], smapre);
          return Q.all([ema, sma]);

      })
      .then(function(d){

            return Q.all([d[1][1], stat.insert.exp_avg(con, d[0]), stat.insert.moving_avg(con, d[1][0]), stat.remove.moving_avg_var_by_symbol(con, d[0][0][0])]);

      })
      .then(function(d){

         var w_avg =  d[0].data.map(function(r) {

                var t = [d[0].symbol, d[0].date, r.col, r.arraySMA.join(','), r.sumSMA , r.arrayRTN.join(","), r.sumRTN, r.i]
                return t
        });

        return stat.insert.moving_avg_var(con, w_avg);
        done();

      })
      .then(function(d){

            done();

      })
      .catch(function(err){

            expect(err).toEqual('promise returned error');
            done();
      });


  });


});
