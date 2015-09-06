var _this = this;

module.exports.expMovingAverage = function (pts , oldVal , newVal) {

    var k = 2 / (pts + 1);
    var t = newVal * k;
    var y = oldVal * (1 - k);
    var ExpMovingAverage = t + y;

    return _this.round(ExpMovingAverage, 4);
};

module.exports.movingAverage = function (avgArray, oldSum, newVal, pts) {

    var oldSum = parseFloat(oldSum);
    var newVal = parseFloat(newVal);

    avgArray.push(newVal);

    var sum = 0;
    var length = avgArray.length;

    if (length > pts) {

        sum = _this.round((oldSum + (avgArray[0] * -1) + newVal), 4);
        avgArray.shift();
    }
    else {

        sum = _this.round(oldSum + newVal, 4);
    }

    return { avg: _this.round((sum / avgArray.length), 4), sum: sum, array: avgArray };
}

module.exports.round = function (value, exp) {

    value = +value;
    exp = +exp;

    if (typeof exp === 'undefined' || +exp === 0) {
        return Math.round(value);

    }

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {

        return NaN;
    }

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));

}


module.exports.numberInRange = function (arr, number){

    var n = arr[0];

    var length = arr.length;

    for (var i = 0; i < length; i++) {

        if (number > arr[i]) {

            n = arr[i];
        }
        else {

            break;
        }
    }

    return n;
}


module.exports.STD_sample = function (arr, mean) {
    return Math.sqrt(variance(arr, 's', mean));
}

module.exports.STD_population = function (arr, mean) {
    return Math.sqrt(variance(arr, 'p', mean));
}

var variance = function (arr, std_type, mean) {

    var len = arr.length;
    var sum = 0;
    var mean = mean;

    if (!mean) {

        for (var i = 0; i < len; i++) {

            if (arr[i] == "") { }
            else {

                sum = sum + parseFloat(arr[i]);
            }
        }

        mean = sum / len;
    }

    var v = 0;
    if (len > 1) {

        for (var i = 0; i < arr.length; i++) {

            if (arr[i] == "") { }

            else {
                v = v + (arr[i] - mean) * (arr[i] - mean);
            }
        }

        if (std_type == 's') {
            return v / (len - 1);
        }
        else {

            return v / len;
        }

    }
    else {

        return 0;
    }
}
