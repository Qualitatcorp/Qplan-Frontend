angular.module('Evaluationmantenedor')

.controller('evaluation.viewclasificacionController', ['$scope','toastr','clasificacion','apiServices','$location', 
	function($scope,toastr,clasificacion,apiServices,$location){
		
		$scope.clasificacion=clasificacion.data;


	}])