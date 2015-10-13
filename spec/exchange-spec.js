require('../app.js');
var exchange = require('../app_server/db/exchange/exchange.js');
var mySQL = require('../app_server/db/db');
var request = require('request');
var Q = require('q');

describe('exchange.insert.one', function () {

    //==============================================================================================//
    it("should save successfully", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            var row = { id: "AMS", name: "EURONEXT AMSTERDAM", city: "AMSTERDAM", country: "THE NETHERLANDS" }
            return Q.all([exchange.insert.one(c, row), c]);

        })
        .then(function (d) {

            console.log('data:'+ d[0].affectedRows);
            d[1].release();
            expect(d[0].affectedRows).toEqual(1);

            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});


describe('exchange.insert.bulk', function () {

    //==============================================================================================//
    it("should save successfully", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            var rows = [ ["ASX" , "ASX - ALL MARKETS", "SYDNEY", "AUSTRALIA" ],
                        [ "ATH", "ATHENS EXCHANGE S.A. CASH MARKET",  "ATHENS", "GREECE" ],
                        [ "BER", "BOERSE BERLIN", "BERLIN",  "GERMANY" ],
                        [ "BRU", "EURONEXT BRUSSELS", "BRUSSELS","BELGIUM" ],
                        [ "BSE","SPOT REGULATED MARKET - BVB","BUCHAREST",  "ROMANIA" ],
                        [ "BTS", "BATS GLOBAL MARKETS ", "KANSAS", "UNITED STATES OF AMERICA" ],
                        [ "BUE", "BOLSA DE COMERCIO DE BUENOS AIRES", "BUENOS AIRES", "ARGENTINA"],
                        ['NYQ', 'NEW YORK STOCK EXCHANGE', 'NEW YORK', 'USA']]


            return Q.all([exchange.insert.bulk(c, rows), c]);

        })
        .then(function (d) {

            d[1].release();
            expect(d[0].affectedRows).toEqual(8);
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});


describe('exchange.find.all', function () {

    //==============================================================================================//
    it("should save successfully", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            return Q.all([exchange.find.all(c), c]);

        })
        .then(function (d) {

            d[1].release();

        //    console.log('data select:'+JSON.stringify(d[0]))
            expect(d[0][0].ID).toEqual('AMS');
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});


describe('exchange.find.byId', function () {

    //==============================================================================================//
    it("should return correct record from select", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            return Q.all([exchange.find.byId(c, 'BER' ), c]);

        })
        .then(function (d) {

            d[1].release();

               console.log('data select id:'+JSON.stringify(d[0]))
            expect(d[0][0].ID).toEqual('BER');
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});

describe('exchange.find.byName', function () {

    //==============================================================================================//
    it("should return correct record from select", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            return Q.all([exchange.find.byName(c, 'ASX - ALL MARKETS'), c]);

        })
        .then(function (d) {

            d[1].release();

               console.log('data select name:'+JSON.stringify(d[0]))
            expect(d[0][0].ID).toEqual('ASX');
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});

describe('exchange.remove.byId', function () {

    //==============================================================================================//
    it("should remove one record from exchange", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            return Q.all([exchange.remove.byId(c, 'BER'), c]);

        })
        .then(function (d) {

            d[1].release();

            expect(d[0].affectedRows).toEqual(1);
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});

// describe('exchange.remove.all', function () {
//
//     //==============================================================================================//
//     it("should remove all records from exchange table", function (done) {
//
//         Q.try(function () {
//
//             return mySQL.getConnection();
//
//         })
//         .then(function (c) {
//
//             return Q.all([exchange.remove.all(c), c]);
//
//         })
//         .then(function (d) {
//
//             d[1].release();
//
//             expect(d[0].affectedRows).toEqual(7);
//             done();
//
//         })
//         .catch(function (error) {
//
//             expect(error).toEqual('promise returned error');
//             console.log('REJECTED:' + error);
//             done();
//         })
//
//     }, 5000);
//
// });
