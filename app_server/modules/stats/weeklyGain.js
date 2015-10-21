var _math = require('../math.js');
var fs = require('fs');

module.exports = function(rows, prev){

try{

  var p = prev;
  var new_rows =  rows.map(function(d, i){

        var abs = gain_abs(p[7], d[7]);
        var per = gain_per(p[7], abs);
        var accum = gain_per_accum(p[12], per);
        d.push(abs,per,accum);
        p=d;
        return d;
    });

  return new_rows;

}
catch(err){

  return('weekly_gain:'+err);

}


}

var gain_abs = function(p,d){

  return _math.round(d - p, 4);
}

var gain_per = function(p,d){

  var per = 0;
  p != 0 ? per = _math.round(d/p, 4) : per = 0

  return per

}

var gain_per_accum = function(p,d){

  var g = 0;
  (p*d > 0) ? g = _math.round(p+d, 4) : g = d;

  return g;
}
