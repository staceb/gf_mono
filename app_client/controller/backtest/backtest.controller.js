(function () {
 angular
.module('gf')
.controller('backtestCtrl', backtestCtrl);

    function backtestCtrl ($scope, $http){

        var vm = this;

        $http.get('/app_api/newStocks')
        .success(function(data){

            console.log('length:'+data.length)
        })
        .error(function(err){

          console.log(err)
        })

        // current time
        var date = new Date();
        //concat hour and minute
        var check = date.getHours() + "" + date.getMinutes();
        //get list of items
        var times = document.getElementsByClassName("c-dropdown__item--time");

        //loop through and compare
        for (var i = 0; i < times.length; i++) {

            var maxtime = parseInt(times[i].getAttribute("data-max"));

            if(maxtime < check) {
                //set display to none
                times[i].style.display = "none";
            }
        }

    }








})();
