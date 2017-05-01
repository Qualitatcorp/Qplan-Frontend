angular.module('Evaluationmantenedor')

.controller('evaluation.viewcategoriaController', ['$scope','toastr','categoria','apiServices','$location', 
	function($scope,toastr,categoria,apiServices,$location){
		
		$scope.categoria=categoria.data;


	}])