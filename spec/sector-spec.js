require('../app.js');
var sector = require('../app_server/db/sector/sector.js');
var mySQL = require('../app_server/db/db');
var request = require('request');
var Q = require('q');

describe('sector.insert.one', function () {

    //==============================================================================================//
    it("should save successfully", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            var row = { name: "Basic Materials", id: 1 }
            return Q.all([sector.insert.one(c, row), c]);

        })
        .then(function (d) {

         //   console.log('data:' + d[0].affectedRows);
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


describe('sector.insert.bulk', function () {

    //==============================================================================================//
    it("should save successfully", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            var rows = [[2, "Conglomerates"],
                [3,"Consumer Goods"],
                [4,"Financial"],
                [5,"Healthcare" ],
                [6,"Industrial Goods"],
                [7,"Services"],
                [8,"Technology"],
                [9,"Utilities"],
                [10,"ETF" ]]


            return Q.all([sector.insert.bulk(c, rows), c]);

        })
        .then(function (d) {

            d[1].release();
            expect(d[0].affectedRows).toEqual(9);
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});


describe('sector.find.all', function () {

    //==============================================================================================//
    it("should find records successfully", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            return Q.all([sector.find.all(c), c]);

        })
        .then(function (d) {

            d[1].release();

            //    console.log('data select:'+JSON.stringify(d[0]))
            expect(d[0][0].ID).toEqual(1);
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});


describe('sector.find.byId', function () {

    //==============================================================================================//
    it("should return correct record from select", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            return Q.all([sector.find.byId(c, 2), c]);

        })
        .then(function (d) {

            d[1].release();
            expect(d[0][0].ID).toEqual(2);
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});

describe('sector.find.byName', function () {

    //==============================================================================================//
    it("should return correct record from select", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            return Q.all([sector.find.byName(c, "Industrial Goods"), c]);

        })
        .then(function (d) {

            d[1].release();


            expect(d[0][0].ID).toEqual(6);
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});

// describe('sector.remove.byId', function () {
//
//     //==============================================================================================//
//     it("should remove one record from exchange", function (done) {
//
//         Q.try(function () {
//
//             return mySQL.getConnection();
//
//         })
//         .then(function (c) {
//
//             return Q.all([sector.remove.byId(c, 1), c]);
//
//         })
//         .then(function (d) {
//
//             d[1].release();
//
//             expect(d[0].affectedRows).toEqual(1);
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
//
// //describe('sector.remove.all', function () {
//
// //    ==============================================================================================//
// //    it("should remove all records from exchange table", function (done) {
//
// //        Q.try(function () {
//
// //            return mySQL.getConnection();
//
// //        })
// //        .then(function (c) {
//
// //            return Q.all([sector.remove.all(c), c]);
//
// //        })
// //        .then(function (d) {
//
// //            d[1].release();
//
// //            expect(d[0].affectedRows).toEqual(9);
// //            done();
//
// //        })
// //        .catch(function (error) {
//
// //            expect(error).toEqual('promise returned error');
// //            console.log('REJECTED:' + error);
// //            done();
// //        })
//
// //    }, 5000);
//
// //});
