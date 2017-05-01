angular.module('Evaluationmantenedor')

.controller('evaluation.editcategoriaController', ['$scope','categoria','apiServices','$location', function($scope,categoria,apiServices,$location){
	
	$scope.categoria=categoria.data;

	$scope.save=function() {
		apiServices.model('clasificacioncategoria').save($scope.categoria).
		then(function(q){
			console.log(q);
			$location.path("evaluation/admincategoria");
		},
		function(q) {
			console.warn(q);
		});
	}
}])