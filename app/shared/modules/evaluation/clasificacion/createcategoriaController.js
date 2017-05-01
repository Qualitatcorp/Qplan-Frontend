angular.module('Evaluationmantenedor')

.controller('evaluation.createcategoriaController', ['$scope','apiServices','$location', function($scope,apiServices,$location){
	
	$scope.categoria={}

	$scope.save=function() {
		apiServices.model('clasificacioncategoria').save($scope.categoria).
		then(function(q){
			$location.path("evaluation/admincategoria");
		},
		function(q) {
			console.warn(q);
		});
	}
}])