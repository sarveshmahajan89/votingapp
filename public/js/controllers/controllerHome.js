var barclaysApp = angular.module('barclaysApp');

barclaysApp.controller('bcHomeCtrl', function ($scope,$location,$http) {
	$scope.activate = true;
	// to do stuff
	$scope.submitForm = function() {
		//alert('submit');
		var subData = {
			"option":$scope.option
		};
		//console.log(subData);
		$http.post('/submitvote', subData).success(function(data) {
			$scope.reponse = data;
			console.log($scope.reponse);
		});
	};

	$scope.auth = function() {
		// alert('login');
		// debugger;
		// $http.get('/auth').success(function(data) {

		// 	$scope.details = data;
		// 	console.log($scope.details);
		// });
		

		if($scope.id == "" || $scope.pass == null){
            	alert('please fill details');
        } else {
        	var subData = {
			"id":$scope.id,
			"pass":$scope.pass
			};

			$http.post('/authenticate', subData).success(function(data) {
				$scope.reponse = data;
				console.log($scope.reponse.status);
				if ($scope.reponse.status) {
					$scope.activate = false;
				} else {
					alert('incorrect id or password');
				}
			});
        }
        $scope.id = '';
		$scope.pass = '';
	};

	$scope.getCount = function() {
		$scope.opt1Count = 0;
		$scope.opt2Count = 0;
		$scope.opt3Count = 0;

		$http.get('/getcount').success(function(data) {
			$scope.reponse = data;
			console.log($scope.reponse.options);
			for(var i=0;i<$scope.reponse.options.length;i++) {
				if($scope.reponse.options[i].option == 'option1') {
					$scope.opt1Count = $scope.opt1Count +1;
				} else if($scope.reponse.options[i].option == 'option2') {
					$scope.opt2Count = $scope.opt2Count +1;
				} else if($scope.reponse.options[i].option == 'option3') {
					$scope.opt3Count = $scope.opt3Count +1;
				}
			}
		});
	}
});

barclaysApp.directive('bInput',function()
{
	return{
		restrict:"E",
		//replace:""
		template:
			'<div>'+
			'<input type="{{bType}} name="{{bName}}">'+
			'</div>',
		scope:
		{
			bType:'@bType',
			bName:'@bName'
		},
		linc:function(scope,elem,attrs,ctrl){

		}
	}
});

barclaysApp.directive('bCheckbox',function()
{
	return{
		restrict:"E",
		//replace:""
		template:
			'<div>'+
			'<input type="{{bType}} name="{{bName}}" value="{{bValue}}"/>'+
			'</div>',
		scope:
		{
			bType:'@bType',
			bName:'@bName',
			bValue:'@bValue'
		},
		linc:function(scope,elem,attrs,ctrl){

		}
	}
});

barclaysApp.directive('item', function() {
  return {
    scope: {
      item: '=set',
      onClick: '&'
    },
    replace: true,
    controller: function() {},
    controllerAs: 'ctrl',
    bindToController: true,
    restrict: 'EA',
    template: '<input type="checkbox" ng-click="ctrl.onClick({item: ctrl.item})" ng-checked="ctrl.item.active" /> '
  }
});