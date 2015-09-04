angular.module('gf', ['ngRoute', 'angular-data.DSCacheFactory']);

function config($routeProvider, $locationProvider) {
    
    $routeProvider.when('/', {
        
        templateUrl: 'controller/backtest/backtest.template.html',
        controller: 'backtestCtrl',
        controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });
    
    $locationProvider.html5Mode(true);


}

angular
.module('gf')
.config(['$routeProvider', '$locationProvider', config]);