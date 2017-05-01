angular.module('Evaluationmantenedor')

.controller('evaluation.createtipoController', ['$scope','apiServices','$location', function($scope,apiServices,$location){
	
	$scope.tipo={}

	$scope.save=function() {
		apiServices.model('evaluaciontipo').save($scope.tipo).
		then(function(q){
			console.log(q);
			$location.path("evaluation/admintipo");
		},
		function(q) {
			console.warn(q);
		});
	}
}])