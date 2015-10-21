var _math = require('../math.js');
fs = require('fs');

module.exports = function(rows, prev){

  try{

    var EMA = [3, 5, 10, 12, 15, 30, 35, 40, 50, 60];
    var EMAlength = 10;

    var p = prev;

    var new_rows = rows.map(function(d){

        var n = [];
        n.push(d[0], d[1]);

        for (var i = 0; i < EMAlength; i++) {   //calculate exponential moving averages

            var col_index = n.length;
            var pts = EMA[i];
            var prev = p[col_index];

            n.push(_math.expMovingAverage(pts , prev , d[7]));
        }

        n.push(Math.min(n[2], n[3], n[4], n[5], n[6]));   //min STEXP
        n.push(Math.max(n[2], n[3], n[4], n[5], n[6]));  //max STEXP
        n.push(Math.min(n[7], n[8], n[9], n[10], n[11]));   //min LTEXP
        n.push(Math.max(n[7], n[8], n[9], n[10], n[11]));   //max LTEXP
        n.push(Math.min(n[12], n[14]));   //min allEXP
        n.push(Math.max(n[13], n[15]));   //max allEXP
        n.push(_math.round(n[13] - n[12], 4));  //min/max distance STEXP
        n.push(_math.round(n[15] - n[14], 4));  //min/max distance LTEXP
        n.push(_math.round(n[17] - n[16], 4));  //min/max distance ALLEXP

        // if max ST lower than min LT
        if(n[13] < n[14]){

            n.push(0);
            n.push(p[22]+1);
        }
        else{

          n.push(p[21]+1);
          n.push(0);

        }
        p=n;
        return n;

    });

    return new_rows;

  }
  catch(err){

      console.log('exp average'+err);
      return err;
  }


}
