var barclaysApp = angular.module('barclaysApp');

barclaysApp.controller('bcIBCtrl', function ($scope,$location,$http) {
	
	// to do stuff
	$scope.submit = function() {
		$http.get('/invest').success(function(data) {
			$scope.reponse = data;
		});
	};
});