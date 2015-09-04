var yahoo = require('../app_server/modules/yahoo');
var request = require('request');
var Q = require('q');

describe("yahoo.buildUrl", function () {
    
    it("Build Daily URL: should respond with url", function () {
        
        
        var qs = { symbol: 'DIS', fromDate: new Date(1990, 0, 1), toDate: new Date(2014, 11, 31), frequency: 'd' };
        var url = yahoo.buildUrl(qs);
        
        expect(url).toEqual('http://ichart.yahoo.com/table.csv?s=DIS&a=0&b=1&c=1990&d=11&e=31&f=2014&g=d');
        

    }, 10000);
    
    it("Build Weekly URL: should respond with url", function () {
        
        var qs = { symbol: 'DIS', fromDate: new Date(1990, 0, 1), toDate: new Date(2014, 11, 31), frequency: 'w' };
        var url = yahoo.buildUrl(qs);
        
        expect(url).toEqual('http://ichart.yahoo.com/table.csv?s=DIS&a=0&b=1&c=1990&d=11&e=31&f=2014&g=w');

    }, 10000);
    
    it("Build URL with to date today: should respond with url", function () {
        
        var qs = { symbol: 'DIS', fromDate: new Date(1990, 0, 1), frequency: 'w' };
        var url = yahoo.buildUrl(qs);
        var date = new Date();
        var d = date.getMonth();
        var e = date.getDate();
        var f = date.getFullYear();
        
        expect(url).toEqual('http://ichart.yahoo.com/table.csv?s=DIS&a=0&b=1&c=1990&d=' + d + '&e=' + e + '&f=' + f + '&g=w');

    }, 10000);
    
    it("Should throw error: Missing query params", function () {
        
        var qs = { fromDate: new Date(1990, 0, 1), toDate: new Date(2014, 11, 31), frequency: 'w' };
        expect(function () { yahoo.buildUrl(qs) }).toThrow(new Error('yahooBuildUrlError:Missing query params'));

    }, 10000);
    
    it("Should throw error: To Date is not a valid date", function () {
        
        var qs = { symbol: 'DIS', fromDate: new Date(1990, 0, 1), toDate: "1625320", frequency: 'd' };
        expect(function () { yahoo.buildUrl(qs) }).toThrow('yahooBuildUrlError:To Date is not a valid date');


    });
    
    it("Should throw error: From Date is not a valid date", function () {
        
        var qs = { symbol: 'DIS', toDate: new Date(1990, 0, 1), fromDate: "1625320", frequency: 'd' };
        expect(function () { yahoo.buildUrl(qs) }).toThrow(new Error('yahooBuildUrlError:From Date is not a valid date'));

    }, 100000);


});

describe("yahoo.historicalQuotes", function () {
    
    it("get Daily: should return JSON", function (done) {
        
        var url = 'http://ichart.yahoo.com/table.csv?s=DIS&a=0&b=1&c=1990&d=11&e=31&f=2014&g=d';
        
        Q.try(function () {
            
            return yahoo.historicalQuotes(url, 'DIS');
        })
        .then(function (d) {
            
            console.log('DATA:' + JSON.stringify(d[(d.length - 1)]));
            expect(d.length).toEqual(6301);
            done();

        })
        .catch(function (status) {
            
            expect(status).toEqual(200);
            console.log('REJECTED:' + error);
            done();
        })

    }, 100000);
    
    it("wrong URL: should return error", function (done) {
        
        var url = 'http://ichart.yahoo.com/table.csv?&a=0&b=1&c=1990&d=11&e=31&f=2014&g=d';
        
        Q.try(function () {
            
            return yahoo.historicalQuotes(url, 'DIS');
        })
        .then(function (d) {
            
            expect(d).toEqual(false);
            done();

        })
        .catch(function (status) {
            
            expect(status).toEqual(404);
            done();
        })

    }, 10000);

}); 