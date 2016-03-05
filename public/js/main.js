var barclaysApp = angular.module('barclaysApp', [
'ngRoute'
]);

barclaysApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'bcHomeCtrl'
      }).
      when('/invest', {
        templateUrl: 'partials/investBanking.html',
        controller: 'bcIBCtrl'
      }).
      when('/corporate', {
          templateUrl: 'partials/corporateBanking.html',
          controller: 'bcCBCtrl'
        }).
        when('/pbanking', {
            templateUrl: 'partials/personalBanking.html',
            controller: 'bcPBCtrl'
          }).
      otherwise({
        redirectTo: '/home'
      });
  }]);