angular.module('Evaluationmantenedor')

.controller('evaluation.edittipoController', ['$scope','tipo','apiServices','$location', function($scope,tipo,apiServices,$location){
	
	$scope.tipo=tipo.data;

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