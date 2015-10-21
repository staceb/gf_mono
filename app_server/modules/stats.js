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
     first.close, first.volume, first.adjclose, 0, 0, 0,
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
     first.adjclose, 0, first.adjclose, 0, 'U',
     0,0, 0,0,0 //" ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
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


    if(row[10]=='NaN'){

      console.log(row[10]);
    }
  //  console.log(row[10]);

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
    row.push(Math.max(row[21], row[23]));   //max allEXP
    row.push(_math.round(row[21] - row[20], 4));  //min/max distance STEXP
    row.push(_math.round(row[23] - row[22], 4));  //min/max distance LTEXP
    row.push(_math.round(row[25] - row[24], 4));  //min/max distance ALLEXP

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

    row.push(_math.round(row[26]/row[21], 4));  //min/max % distance STEXP
    row.push(_math.round(row[27]/row[23], 4));  //min/max % distance LTEXP
    row.push(_math.round(row[28]/row[25], 4));  //min/max % distance ALLEXP

// number of days STEXP lower or higher than LTEXP

    if(row[21] < row[22]){

        row.push(0);
        row.push(previous[83]+1);
    }
    else{
      row.push(previous[82]+1);
      row.push(0);

    }
// console.log(row[10])
/// TEST FOR GUPPY TRADES //
    //SIGNAL

  //   if(row[82]==1 && previous[83]>4 && row[79] < 0.05 && row[80] < 0.05 && row[81] < 0.1){
  //     row.push('B')
  //   }
  //   else if(row[81] > 0.2 && previous[88]>0){
  //     row.push('S')
  //   }
  //   else{
  //     row.push('')
  //   }
  //
  //
  // //SHARES_BOUGHT
  // row[84]=="B" ? row.push( _math.round(1000/row[7], 0) ) : row.push(0);
  // //VALUE BOUGHT
  // row.push(row[85]*row[7])
  // //TOTAL_BOUGHT
  // row[84] != "S" ? row.push(previous[87]+row[86]) : row.push(0);
  // // TOTAL_SHARES
  //   if(row[84]=="B"){
  //
  //     row.push((row[85]+previous[88]))
  //   }
  //   else if (row[84]=="S") {
  //       row.push(0);
  //   }
  //   else{
  //
  //     row.push(previous[88]);
  //   }
  //   //SHARES_SOLD
  //   row[84] =="S" ? row.push(previous[88]) : row.push(0)
  //
  //   // //VALUE_SOLD
  //   row.push(row[89]*row[7])
  //   //GAIN_ABS
  //   row[90]> 0 ? row.push((row[90]-previous[87])) : row.push(0);
  //   // //GAIN_PER
  //   row[90]> 0 ? row.push(((row[90]-previous[87])/previous[87])) : row.push(0);
  //   //PORTFOLIO_VAL
  //   row.push(row[88]*row[7])
  //   //PORTFOLIO_GAIN
  //   row[88]>0 ?  row.push(((row[93]-row[87])/row[87])) : row.push(0)
  //
  (previous[9]*row[9] > 0) ? row.push(_math.round(previous[9]+row[9], 4)) : row.push(row[9]);

  fs.appendFile('message.txt', (row + '\n') , function (err) {
    //  console.log(err)
});

///////////////////////////////////////////////////////////////
    newDocs.push(row);
    rowindex = rowindex+1;

  }

  return [newDocs, lastDoc];


}
