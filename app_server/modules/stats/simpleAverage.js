var _math = require('../math.js');
fs = require('fs');

module.exports = function(rows, prev){

  var SMAlength = 10;
  var p = prev;

  try{

    var new_rows = rows.map(function(d){

        var n = [];
        n.push(d[0], d[1]);

        for(var e = 0; e < SMAlength; e++){

          var avgClose = _math.movingAverage(p.data[e].arraySMA, p.data[e].sumSMA, d[7], p.data[e].i);
          var avgRtn = _math.movingAverage(p.data[e].arrayRTN , p.data[e].sumRTN, d[11], p.data[e].i);

          n.push(avgClose.avg);
          n.push(_math.STD_sample(avgClose.array, avgClose.avg));
          n.push(avgRtn.avg);
          n.push(_math.STD_sample(avgRtn.array, avgRtn.avg));

          if (avgClose.avg > d[7]) {

              n.push("D");
          }
          else {

              n.push("U");
          }

          p.data[e].arraySMA = avgClose.array;
          p.data[e].arrayRTN = avgRtn.array;
          p.data[e].sumSMA = avgClose.sum;
          p.data[e].sumRTN = avgRtn.sum;
          p.date = d[1];

        }

        return n

      });

      return [new_rows, p];
  }
  catch(err){

      console.log('simple average'+err);
      return err;

  }

}
