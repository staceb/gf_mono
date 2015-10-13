require('../app.js');
var industry = require('../app_server/db/industry/industry.js');
var mySQL = require('../app_server/db/db');
var request = require('request');
var Q = require('q');

describe('industry.insert.one', function () {

    //==============================================================================================//
    it("should save successfully", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            var row = { name: "Conglomerates", id: "210", sectorId: "2" }

            return Q.all([industry.insert.one(c, row), c]);

        })
        .then(function (d) {

            console.log('data:' + d[0].affectedRows);
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


describe('industry.insert.bulk', function () {

    //==============================================================================================//
    it("should save successfully", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            var rows = [[110,"Chemicals - Major Diversified",1],
[112,"Agricultural Chemicals",1],
[310,"Appliances",3],
[422,"Asset Management",4],
[330,"Auto Manufacturers - Major",3],
[333,"Auto Parts",3],
[346,"Beverages - Brewers",3],
[348,"Beverages - Soft Drinks",3],
[313,"Business Equipment",3],
[326,"Cleaning Products",3],
[424,"Credit Services",4],
[423,"Diversified Investments",4],
[314,"Electronic Equipment",3],
[341,"Farm Products",3],
[340,"Food - Major Diversified",3],
[417,"Foreign Money Center Banks",4],
[418,"Foreign Regional Banks",4],
[134,"Gold",1],
[311,"Home Furnishings & Fixtures",3],
[121,"Independent Oil & Gas",1],
[133,"Industrial Metals & Minerals",1],
[420,"Investment Brokerage - National",4],
[120,"Major Integrated Oil & Gas",1],
[410,"Money Center Banks",4],
[327,"Office Supplies",3],
[124,"Oil & Gas Equipment & Services",1],
[122,"Oil & Gas Refining & Marketing",1],
[325,"Packaging & Containers",3],
[324,"Paper & Paper Products",3],
[342,"Processed & Packaged Goods",3],
[317,"Recreational Goods, Other",3],
[332,"Recreational Vehicles",3],
[413,"Regional - Southeast Banks",4],
[322,"Rubber & Plastics",3],
[135,"Silver",1],
[113,"Specialty Chemicals",1],
[316,"Sporting Goods",3],
[111,"Synthetics",1],
[320,"Textile - Apparel Clothing",3],
[315,"Toys & Games",3],
[331,"Trucks & Other Vehicles",3]

];


            return Q.all([industry.insert.bulk(c, rows), c]);

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


describe('industry.find.all', function () {

    //==============================================================================================//
    it("should find records successfully", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            return Q.all([industry.find.all(c), c]);

        })
        .then(function (d) {

            d[1].release();

            //    console.log('data select:'+JSON.stringify(d[0]))
            expect(d[0][0].ID).toEqual(210);
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});


describe('industry.find.byId', function () {

    //==============================================================================================//
    it("should return correct record from select", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            return Q.all([industry.find.byId(c, 311), c]);

        })
        .then(function (d) {

            d[1].release();
            expect(d[0][0].ID).toEqual(311);
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});

describe('industry.find.byName', function () {

    //==============================================================================================//
    it("should return correct record from select", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            return Q.all([industry.find.byName(c, "Toys & Games"), c]);

        })
        .then(function (d) {

            d[1].release();


            expect(d[0][0].ID).toEqual(315);
            done();

        })
        .catch(function (error) {

            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});

// describe('industry.remove.byId', function () {
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
//             return Q.all([industry.remove.byId(c, 315), c]);
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

//describe('sector.remove.all', function () {

//    ==============================================================================================//
//    it("should remove all records from exchange table", function (done) {

//        Q.try(function () {

//            return mySQL.getConnection();

//        })
//        .then(function (c) {

//            return Q.all([sector.remove.all(c), c]);

//        })
//        .then(function (d) {

//            d[1].release();

//            expect(d[0].affectedRows).toEqual(9);
//            done();

//        })
//        .catch(function (error) {

//            expect(error).toEqual('promise returned error');
//            console.log('REJECTED:' + error);
//            done();
//        })

//    }, 5000);

//});
