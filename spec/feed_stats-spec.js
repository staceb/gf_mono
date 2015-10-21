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
          Q.try(function(){

                return mySQL.getConnection();

          })
          .then(function(c){

              con = c;

          })

  });


});
