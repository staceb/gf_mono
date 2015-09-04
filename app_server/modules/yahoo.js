var request = require('request');
var csv = require('csv-stream');
var fs = require('fs');
var Q = require('q');

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
    var csvStream = csv.createStream();
    var docs = [];


    if (url && symbol) {

        request({
            url: url
            
        }, function (err, res, body) {

            if (!err && res.statusCode == 200 && body) {

                var data = body.split('\n');

                data.shift();

                data.map(function (d) {

                    var doc = d.split(',');

                    if (doc[4] && doc[4] > 0) {
                        docs.push({
                            symbol: symbol,
                            date: new Date(doc[0]),
                            open: doc[1],
                            high: doc[2],
                            low: doc[3],
                            close: doc[4],
                            volume: doc[5],
                            adjclose: doc[6],
                            month: new Date(doc[0]).getMonth(),
                            year: new Date(doc[0]).getFullYear()
                        });
                    }

                });

                deferred.resolve(docs);
            }
            else {

                deferred.resolve(false);
            }

        });

    }
    else {

        deferred.reject("getYahooFeedError: Url is required");
    }

    return deferred.promise;

}
