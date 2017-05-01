angular.module('Worker')

.controller('worker.viewController', ['$scope','worker','trabajadorServices','comunaServices','paisServices','$location', function($scope,worker,trabajadorServices,comunaServices,paisServices,$location){
	$scope.back=function() {
		window.history.back();
	};
	$scope.worker=worker.data;

}])