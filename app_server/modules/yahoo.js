var request = require('request');
var http = require('http')
var csv = require('csv-stream');
var fs = require('fs');
var Q = require('q');
var config = require("../../config.js");

module.exports.buildUrl = function (query) {

    if (query.symbol && query.fromDate && query.frequency) {

        var s, a, b, c, d, e, f, g;

        if (!isNaN(Date.parse(query.fromDate))) {

            a = query.fromDate.getMonth();
            b = query.fromDate.getDate();
            c = query.fromDate.getFullYear();
        }
        else {

            throw new TypeError("yahooBuildUrlError:From Date is not a valid date");
        }

        if (query.toDate) {

            if (!isNaN(Date.parse(query.toDate))) {

                d = query.toDate.getMonth();
                e = query.toDate.getDate();
                f = query.toDate.getFullYear();

            }
            else {

                throw new TypeError("yahooBuildUrlError:To Date is not a valid date");
            }

        }
        else {

            var t = new Date();
            d = t.getMonth();
            e = t.getDate();
            f = t.getFullYear();

        }

        s = query.symbol;
        g = query.frequency;

        var url = "http://ichart.yahoo.com/table.csv?s=" + s + '&a=' + a + '&b=' + b + '&c=' + c + '&d=' + d + '&e=' + e + '&f=' + f + '&g=' + g;

        return url;
    }
    else {

        throw new TypeError('yahooBuildUrlError:Missing query params');

    }


}

module.exports.historicalQuotes = function (url, symbol) {

    var deferred = Q.defer();
    var docs = [];
    var yReq = config.feed;
    yReq.url = url;

    if (url && symbol) {

        var docs = [];
        var csvStream = csv.createStream();


        request( yReq , function (err, res, body) {
            console.log('response:'+res.statusCode)
            if (!err && res.statusCode == 200 && body) {
                console.log('yahoo done:'+symbol)
                // var data = body.split('\n');
                //
                // data.shift();
                //
                // data.map(function (d) {
                //
                //     var doc = d.split(',');
                //
                //     if (doc[4] && doc[4] > 0) {
                //
                //       docs.unshift([
                //           symbol,
                //           doc[0],
                //           doc[1],
                //           doc[2],
                //           doc[3],
                //           doc[4],
                //           doc[5],
                //           doc[6],
                //           new Date(doc[0]).getMonth(),
                //           new Date(doc[0]).getFullYear()
                //       ]);
                //
                //     }
                //
                // });

                deferred.resolve(body);
            }
            else {

                deferred.reject(err);
            }

        });


    //    console.log( 'length:'+http.globalAgent.sockets.length )
      //   var req =  hyperquest.get(url).pipe(csvStream)
      //   .on('error',function(err){
      //     console.error(err);
      //   })
      // //   .on('data',function(data){
      // //     // outputs an object containing a set of key/value pair representing a line found in the csv file.
      // //     //  data.shift()
      // // //    console.log(data);
      // //
      // //   })
      //   .on('end',function(){
          // outputs an object containing a set of key/value pair representing a line found in the csv file.
          //  data.shift()
      //    console.log(data);


        // });

        //
        //
        // req.on('data', function (chunk) {
        //
        //             var rows = chunk.split('\n');
        //             rows.shift();
        //
        //             rows.map(function (d) {
        //
        //                 var doc = d.split(',');
        //
        //                 if (doc[4] && doc[4] > 0) {
        //
        //                   docs.unshift([
        //                       symbol,
        //                       doc[0],
        //                       doc[1],
        //                       doc[2],
        //                       doc[3],
        //                       doc[4],
        //                       doc[5],
        //                       doc[6],
        //                       new Date(doc[0]).getMonth(),
        //                       new Date(doc[0]).getFullYear()
        //                   ]);
        //
        //                 }
        //
        //             });
        //    });
        //
        // req.on('error', function(err){
        //   console.log(err);
        //   deferred.reject(err);
        //
        // })
        //
        // req.on('end', function(res){
        //     console.log(symbol);
        //     deferred.resolve(docs);
        //
        // })

      //    request.get( yReq , function (err, res, body) {
      //   //    console.log(err)
      // //      console.log(body)
      //     //  console.log(body)
      //       if (!err && res.statusCode == 200 && body) {
      //
      //           var data = body.split('\n');
      //
      //           data.shift();
      //
      //           data.map(function (d) {
      //
      //               var doc = d.split(',');
      //
      //               if (doc[4] && doc[4] > 0) {
      //
      //                 docs.unshift([
      //                     symbol,
      //                     doc[0],
      //                     doc[1],
      //                     doc[2],
      //                     doc[3],
      //                     doc[4],
      //                     doc[5],
      //                     doc[6],
      //                     new Date(doc[0]).getMonth(),
      //                     new Date(doc[0]).getFullYear()
      //                 ]);
      //
      //               }
      //
      //           });
      //
      //           deferred.resolve(docs);
      //       }
      //       else {
      //           console.log(err)
      //           deferred.reject(err);
      //       }
      //
      //    });


    }
    else {

        deferred.reject("getYahooFeedError: Url is required");
    }

    return deferred.promise;

}
