angular.module('Evaluationmantenedor')

.controller('evaluation.viewclasificacionperfilController', ['$scope','toastr','clasificacionperfil','apiServices','$location', 
	function($scope,toastr,clasificacionperfil,apiServices,$location){
		
		$scope.clasificacionperfil=clasificacionperfil.data;

	}])