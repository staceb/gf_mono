var _math = require('./math.js');
fs = require('fs');

//----------------------------------------------------------------//
// !! Docs should be sorted by latest record to calc correctly !! //
//----------------------------------------------------------------//

module.exports.calcStats = function (docs, lastDoc, frequency){

//LTSMA1 = YRAVG;
// 
// if( !docs || !docs[0].symbol){
//
//   return [[],[]];
// }

var ind = docs.length-1;
var rowindex = 0;
var EMA = [3, 5, 10, 12, 15, 30, 35, 40, 50, 60];
var docsLength = docs.length;
var EMAlength = 10;
var SMAlength = 10;
var lastDoc = lastDoc;
var newDocs = [];
// check to see if there are previous records for the stock, if not, we set the first record as the previous record
// and set the index to start calculating at the second record

if (!lastDoc || !lastDoc.data[0].array) {

   var first = docs[ind];

   var row =
   [ first.symbol, first.date, first.open, first.high, first.low,
     first.close, first.volume, first.adjclose, 0, 0,
     first.adjclose, first.adjclose, first.adjclose, first.adjclose,
     first.adjclose, first.adjclose, first.adjclose, first.adjclose,
     first.adjclose, first.adjclose,
     0,0,0,0,0,0,0,0,0,
     first.adjclose, 0, first.adjclose, 0, 'U',
     first.adjclose, 0, first.adjclose, 0, 'U',
     first.adjclose, 0, first.adjclose, 0, 'U',
     first.adjclose, 0, first.adjclose, 0, 'U',
     first.adjclose, 0, first.adjclose, 0, 'U',
     first.adjclose, 0, first.adjclose, 0, 'U',
     first.adjclose, 0, first.adjclose, 0, 'U',
     first.adjclose, 0, first.adjclose, 0, 'U',
     first.adjclose, 0, first.adjclose, 0, 'U',
     first.adjclose, 0, first.adjclose, 0, 'U'
   ]

    newDocs.push(row);

    lastDoc = {symbol: first.symbol, date: first.date,
    data: [{col: 'STSMA1', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0, i: 1},
    {col: 'STSMA2', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 2},
    {col: 'STSMA3', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 5},
    {col: 'STSMA4', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 10},
    {col: 'STSMA5', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 40},
    {col: 'LTSMA1', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 50},
    {col: 'LTSMA2', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 60},
    {col: 'LTSMA3', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 80},
    {col: 'LTSMA4', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0,  i: 100},
    {col: 'LTSMA5', arraySMA: [], sumSMA: 0, arrayRTN: [], sumRTN: 0, i: 200}] };


    ind = ind-1;
    //  console.log(row);

  }

  for (var c = ind; c >= 0; c--) {

    var previous = newDocs[rowindex];

    var row = [docs[c].symbol, docs[c].date, docs[c].open, docs[c].high, docs[c].low, docs[c].close, docs[c].volume, docs[c].adjclose];

    row.push(_math.round(row[7] - previous[7], 4));  //gain abs
    row.push(_math.round(row[8] / previous[7], 4));   //gain percent

    for (var d = 0; d < EMAlength; d++) {   //calculate exponential moving averages

        var col_index = row.length;
        var pts = EMA[d];
        var prev = previous[col_index];

        row.push(_math.expMovingAverage(pts , prev , row[7]));
    }

    row.push(Math.min(row[10], row[11], row[12], row[13], row[14]));   //min STEXP
    row.push(Math.max(row[10], row[11], row[12], row[13], row[14]));  //max STEXP
    row.push(Math.min(row[15], row[16], row[17], row[18], row[19]));   //min LTEXP
    row.push(Math.max(row[15], row[16], row[17], row[18], row[19]));   //max LTEXP
    row.push(Math.min(row[20], row[22]));   //min allEXP
    row.push(Math.max(row[20], row[22]));   //max allEXP
    row.push(_math.round(row[21] - previous[20], 4));  //min/max distance STEXP
    row.push(_math.round(row[23] - previous[22], 4));  //min/max distance LTEXP
    row.push(_math.round(row[25] - previous[24], 4));  //min/max distance ALLEXP

    for(var e = 0; e < SMAlength; e++){

      var avgClose = _math.movingAverage(lastDoc.data[e].arraySMA, lastDoc.data[e].sumSMA, row[7], lastDoc.data[e].i);
      var avgRtn = _math.movingAverage(lastDoc.data[e].arrayRTN , lastDoc.data[e].sumRTN, row[9], lastDoc.data[e].i);

      row.push(avgClose.avg);
      row.push(_math.STD_sample(avgClose.array, avgClose.avg));
      row.push(avgRtn.avg);
      row.push(_math.STD_sample(avgRtn.array, avgRtn.avg));

      if (avgClose.avg > row[7]) {

          row.push("D");
      }
      else {

          row.push("U");
      }

      lastDoc.data[e].arraySMA = avgClose.array;
      lastDoc.data[e].arrayRTN = avgRtn.array;
      lastDoc.data[e].sumSMA = avgClose.sum;
      lastDoc.data[e].sumRTN = avgRtn.sum;
      lastDoc.date = row[1];

    }

    newDocs.push(row);
    rowindex = rowindex+1;
//    console.log(row);
  }

  return [newDocs, lastDoc];


}
