require('../app.js');
var symbol = require('../app_server/db/symbol/symbol.js');
var mySQL = require('../app_server/db/db');
var request = require('request');
var Q = require('q');

describe('symbol.insert.one', function () {
    
    //==============================================================================================//
    it("should save successfully", function (done) {
        
        Q.try(function () {
            
            return mySQL.getConnection();

        })
        .then(function (c) {
            
            var row = { symbol: "YHOO", name: 'yahoo Inc.', industryId: 210, sectorId: 2, exchangeId: 1 }
            return Q.all([symbol.insert.one(c, row), c]);
           
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
           
            var rows = [['DIS', 'Disney', 210, 2, 1],
                ['AAPL', 'Apple Inc.', 210, 2, 1]]
            
            
            return Q.all([symbol.insert.bulk(c, rows), c]);
           
        })
        .then(function (d) {
            
            d[1].release();
            expect(d[0].affectedRows).toEqual(2);
            done();
        
        })
        .catch(function (error) {
            
            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});


describe('symbol.find.all', function () {
    
    //==============================================================================================//
    it("should find records successfully", function (done) {
        
        Q.try(function () {
            
            return mySQL.getConnection();

        })
        .then(function (c) {
            
            return Q.all([symbol.find.all(c), c]);
           
        })
        .then(function (d) {
            
            d[1].release();
            
            //    console.log('data select:'+JSON.stringify(d[0]))
            expect(d[0][0].SYMBOL).toEqual('AAPL');
            done();
        
        })
        .catch(function (error) {
            
            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});


describe('symbol.find.bySymbol', function () {
    
    //==============================================================================================//
    it("should return correct record from select", function (done) {
        
        Q.try(function () {
            
            return mySQL.getConnection();

        })
        .then(function (c) {
            
            return Q.all([symbol.find.bySymbol(c, "DIS"), c]);
           
        })
        .then(function (d) {
            
            d[1].release();
            expect(d[0][0].SYMBOL).toEqual('DIS');
            done();
        
        })
        .catch(function (error) {
            
            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});

describe('symbol.find.like', function () {
    
    //==============================================================================================//
    it("should return correct record from select", function (done) {
        
        Q.try(function () {
            
            return mySQL.getConnection();

        })
        .then(function (c) {
            
            return Q.all([symbol.find.like(c, "Inc"), c]);
           
        })
        .then(function (d) {
            
            d[1].release();
            
            
            expect(d[0][0].SYMBOL).toEqual('AAPL');
            done();
        
        })
        .catch(function (error) {
            
            expect(error).toEqual('promise returned error');
            console.log('REJECTED:' + error);
            done();
        })

    }, 5000);

});

//describe('sector.remove.byId', function () {
    
//    //==============================================================================================//
//    it("should remove one record from exchange", function (done) {
        
//        Q.try(function () {
            
//            return mySQL.getConnection();

//        })
//        .then(function (c) {
            
//            return Q.all([sector.remove.byId(c, 1), c]);
           
//        })
//        .then(function (d) {
            
//            d[1].release();
            
//            expect(d[0].affectedRows).toEqual(1);
//            done();
        
//        })
//        .catch(function (error) {
            
//            expect(error).toEqual('promise returned error');
//            console.log('REJECTED:' + error);
//            done();
//        })

//    }, 5000);

//});

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
