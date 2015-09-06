require('../app.js');
var weekly_average = require('../app_server/db/weekly_average/weekly_average.js');
var mySQL = require('../app_server/db/db');
var request = require('request');
var Q = require('q');
//
// describe('weekly_average.insert.bulk', function () {
//
//     //==============================================================================================//
//     it("should save successfully", function (done) {
//
//         Q.try(function () {
//
//             return mySQL.getConnection();
//
//         })
//         .then(function (c) {
//
// var rows = [["CAE","1980-06-20","STSMA1_VAL","1,2,3,4,5", 500, 214, 422],
//  ["CAE", "1980-06-20",  "STSMA2_VAL","5,6,7,8,9,10,11,12,23",500,21,19],
//  ["CAE","1980-06-20",  "STSMA3_VAL","5,6,7,8,9,10,11,12,23",500,21,19],
//  ["CAE","1980-06-20",  "STSMA4_VAL","5,6,7,8,9,10,11,12,23",500,21,19],
//  ["CAE","1980-06-20",  "STSMA5_VAL","5,6,7,8,9,10,11,12,23",500,21,19],
//  ["CAE","1980-06-20",  "LTSMA1_VAL","5,6,7,8,9,10,11,12,23",500,21,19],
//  ["CAE","1980-06-20",  "LTSMA2_VAL","5,6,7,8,9,10,11,12,23",500,21,19],
//  ["CAE","1980-06-20",  "LTSMA3_VAL","5,6,7,8,9,10,11,12,23",500,21,19],
//  ["CAE","1980-06-20",  "LTSMA4_VAL","5,6,7,8,9,10,11,12,23",500,21,19],
//  ["CAE","1980-06-20",  "LTSMA5_VAL","5,6,7,8,9,10,11,12,23",500,21,19]]
//
//
//             return Q.all([weekly_average.insert.bulk(c, rows), c]);
//
//         })
//         .then(function (d) {
//
//             d[1].release();
//             expect(d[0].affectedRows).toEqual(10);
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


describe('weekly_average.find.bySymbol', function () {

    //==============================================================================================//
    it("should return correct record from select", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            return Q.all([weekly_average.find.bySymbol(c, "CAE"), c]);

        })
        .then(function (d) {
            console.log(JSON.stringify(d[0]));
            d[1].release();
            expect(d[0].symbol).toEqual('CAE');
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});
