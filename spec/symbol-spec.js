require('../app.js');
var symbol = require('../app_server/db/symbol/symbol.js');
var mySQL = require('../app_server/db/db');
var request = require('request');
var Q = require('q');


describe('sector.remove.all', function () {

  // ==============================================================================================//
   it("should remove all records from exchange table", function (done) {

       Q.try(function () {

           return mySQL.getConnection();

       })
       .then(function (c) {

           return Q.all([sector.remove.all(c), c]);

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

describe('symbol.insert.one', function () {

    //==============================================================================================//
    it("should save successfully", function (done) {

        Q.try(function () {

            return mySQL.getConnection();

        })
        .then(function (c) {

            var row = { symbol: "YHOO", name: 'yahoo Inc.', industryId: 210, sectorId: 2, exchangeId: "NYQ" }
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

            var rows = [["WLKP","Westlake Chemical Partners LP",110,1,"NYQ"],
["DOW","The Dow Chemical Company",110,1,"NYQ"],
["EMN","Eastman Chemical Co.",110,1,"NYQ"],
["LXU","LSB Industries Inc.",110,1,"NYQ"],
["VHI","Valhi, Inc.",110,1,"NYQ"],
["MTX","Minerals Technologies Inc.",110,1,"NYQ"],
["APD","Air Products & Chemicals Inc.",110,1,"NYQ"],
["RYAM","Rayonier Advanced Materials Inc.",110,1,"NYQ"],
["TSE","Trinseo SA",111,1,"NYQ"],
["AVD","American Vanguard Corp.",112,1,"NYQ"],
["MON","Monsanto Company",112,1,"NYQ"],
["AGU","Agrium Inc.",112,1,"NYQ"],
["SYT","Syngenta AG",112,1,"NYQ"],
["CF","CF Industries Holdings, Inc.",112,1,"NYQ"],
["POT","Potash Corp. of Saskatchewan, Inc.",112,1,"NYQ"],
["RNF","Rentech Nitrogen Partners, L.P.",112,1,"NYQ"],
["IPI","Intrepid Potash, Inc.",112,1,"NYQ"],
["DD","E. I. du Pont de Nemours and Company",112,1,"NYQ"],
["UAN","CVR Partners, LP",112,1,"NYQ"],
["TNH","Terra Nitrogen Company, L.P.",112,1,"NYQ"],
["CGA","China Green Agriculture, Inc.",112,1,"NYQ"],
["KRA","Kraton Performance Polymers Inc.",113,1,"NYQ"],
["RDS-B","Royal Dutch Shell plc",120,1,"NYQ"],
["ECA","Encana Corporation",120,1,"NYQ"],
["E","Eni SpA",120,1,"NYQ"],
["EC","Ecopetrol SA",120,1,"NYQ"],
["ANW","Aegean Marine Petroleum Network Inc.",120,1,"NYQ"],
["EQM","EQT Midstream Partners, LP",120,1,"NYQ"],
["SSL","Sasol Ltd.",120,1,"NYQ"],
["EPD","Enterprise Products Partners L.P.",121,1,"NYQ"],
["SGY","Stone Energy Corp.",121,1,"NYQ"],
["EEQ","Enbridge Energy Management LLC",121,1,"NYQ"],
["COG","Cabot Oil & Gas Corporation",121,1,"NYQ"],
["EOG","EOG Resources, Inc.",121,1,"NYQ"],
["OXY","Occidental Petroleum Corporation",121,1,"NYQ"],
["MTDR","Matador Resources Company",121,1,"NYQ"],
["PBF","PBF Energy Inc.",122,1,"NYQ"],
["ALJ","Alon USA Energy, Inc.",122,1,"NYQ"],
["CVI","CVR Energy, Inc.",122,1,"NYQ"],
["HFC","HollyFrontier Corporation",122,1,"NYQ"],
["CLB","Core Laboratories NV",124,1,"NYQ"],
["HELI","CHC Group Ltd.",124,1,"NYQ"],
["SSE","Seventy Seven Energy Inc.",124,1,"NYQ"],
["FTI","FMC Technologies, Inc.",124,1,"NYQ"],
["RES","RPC Inc.",124,1,"NYQ"],
["BAS","Basic Energy Services, Inc.",124,1,"NYQ"],
["DNOW","NOW Inc.",124,1,"NYQ"],
["MIL","MFC Industrial Ltd.",133,1,"NYQ"],
["RIOM","Rio Alto Mining Limited",133,1,"NYQ"],
["NRP","Natural Resource Partners LP",133,1,"NYQ"],
["MCP","Molycorp, Inc.",133,1,"NYQ"],
["BHP","BHP Billiton Limited",133,1,"NYQ"],
["GG","Goldcorp Inc.",134,1,"NYQ"],
["KGC","Kinross Gold Corporation",134,1,"NYQ"],
["AEM","Agnico Eagle Mines Limited",134,1,"NYQ"],
["AG","First Majestic Silver Corp.",135,1,"NYQ"],
["SLW","Silver Wheaton Corp.",135,1,"NYQ"],
["SVM","Silvercorp Metals Inc.",135,1,"NYQ"],
["FSM","Fortuna Silver Mines Inc.",135,1,"NYQ"],
["NC","Nacco Industries Inc.",210,2,"NYQ"],
["WHR","Whirlpool Corp.",310,3,"NYQ"],
["MHK","Mohawk Industries Inc.",311,3,"NYQ"],
["FBHS","Fortune Brands Home & Security, Inc.",311,3,"NYQ"],
["NTZ","Natuzzi SpA",311,3,"NYQ"],
["LEG","Leggett & Platt, Incorporated",311,3,"NYQ"],
["AVY","Avery Dennison Corporation",313,3,"NYQ"],
["CAJ","Canon Inc.",313,3,"NYQ"],
["PBI","Pitney Bowes Inc.",313,3,"NYQ"],
["PAY","VeriFone Systems, Inc.",313,3,"NYQ"],
["KNL","Knoll, Inc.",313,3,"NYQ"],
["SNE","Sony Corporation",314,3,"NYQ"],
["KODK","Eastman Kodak Co.",314,3,"NYQ"],
["LF","LeapFrog Enterprises Inc.",315,3,"NYQ"],
["NLS","Nautilus Inc.",316,3,"NYQ"],
["ELY","Callaway Golf Co.",316,3,"NYQ"],
["MOV","Movado Group, Inc.",317,3,"NYQ"],
["TVPT","Travelport Worldwide Limited",317,3,"NYQ"],
["BC","Brunswick Corporation",317,3,"NYQ"],
["RL","Ralph Lauren Corporation",320,3,"NYQ"],
["KORS","Michael Kors Holdings Limited",320,3,"NYQ"],
["CSL","Carlisle Companies Incorporated",322,3,"NYQ"],
["MYE","Myers Industries Inc.",322,3,"NYQ"],
["CTB","Cooper Tire & Rubber Co.",322,3,"NYQ"],
["TG","Tredegar Corp.",322,3,"NYQ"],
["GLT","PH Glatfelter Co.",324,3,"NYQ"],
["VRS","Verso Paper Corp.",324,3,"NYQ"],
["PKG","Packaging Corporation of America",325,3,"NYQ"],
["ATR","AptarGroup, Inc.",325,3,"NYQ"],
["BERY","Berry Plastics Group, Inc.",325,3,"NYQ"],
["IP","International Paper Company",325,3,"NYQ"],
["CHD","Church & Dwight Co. Inc.",326,3,"NYQ"],
["ZEP","Zep, Inc.",326,3,"NYQ"],
["EBF","Ennis Inc.",327,3,"NYQ"],
["GM","General Motors Company",330,3,"NYQ"],
["HMC","Honda Motor Co., Ltd.",330,3,"NYQ"],
["WNC","Wabash National Corp.",331,3,"NYQ"],
["OSK","Oshkosh Corporation",331,3,"NYQ"],
["MPX","Marine Products Corp.",332,3,"NYQ"],
["THO","Thor Industries Inc.",332,3,"NYQ"],
["MTOR","Meritor, Inc.",333,3,"NYQ"],
["LDL","Lydall Inc.",333,3,"NYQ"],
["TEN","Tenneco Inc.",333,3,"NYQ"],
["WWAV","The WhiteWave Foods Company",340,3,"NYQ"],
["POST","Post Holdings, Inc.",340,3,"NYQ"],
["FDP","Fresh Del Monte Produce Inc.",341,3,"NYQ"],
["IBA","Industrias Bachoco S.A.B. de C.V.",341,3,"NYQ"],
["GRO","Agria Corporation",341,3,"NYQ"],
["THS","Treehouse Foods, Inc.",342,3,"NYQ"],
["GIS","General Mills, Inc.",342,3,"NYQ"],
["BGS","B&G; Foods Inc.",342,3,"NYQ"],
["VCO","Vina Concha y Toro S.A.",346,3,"NYQ"],
["SAM","Boston Beer Co. Inc.",346,3,"NYQ"],
["BORN","China New Borun Corporation",346,3,"NYQ"],
["KO","The Coca-Cola Company",348,3,"NYQ"],
["DPS","Dr Pepper Snapple Group, Inc.",348,3,"NYQ"],
["AKO-B","Embotelladora Andina S.A.",348,3,"NYQ"],
["BAC","Bank of America Corporation",410,4,"NYQ"],
["C","Citigroup Inc.",410,4,"NYQ"],
["MTU","Mitsubishi UFJ Financial Group, Inc.",410,4,"NYQ"],
["MSL","Midsouth Bancorp Inc.",413,4,"NYQ"],
["EVER","EverBank Financial Corp.",413,4,"NYQ"],
["FNB","F.N.B. Corporation",413,4,"NYQ"],
["SAN","Banco Santander, S.A.",417,4,"NYQ"],
["UBS","UBS AG",417,4,"NYQ"],
["DB","Deutsche Bank AG",418,4,"NYQ"],
["CIB","Bancolombia S.A.",418,4,"NYQ"],
["LUK","Leucadia National Corporation",420,4,"NYQ"],
["MS","Morgan Stanley",420,4,"NYQ"],
["CNS","Cohen & Steers Inc.",422,4,"NYQ"],
["BLK","BlackRock, Inc.",422,4,"NYQ"],
["MAIN","Main Street Capital Corporation",423,4,"NYQ"],
["SBR","Sabine Royalty Trust",423,4,"NYQ"],
["LEAF","Springleaf Holdings, LLC",424,4,"NYQ"],
["NNI","Nelnet, Inc.",424,4,"NYQ"]
]


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
