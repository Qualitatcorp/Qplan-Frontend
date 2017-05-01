angular.module('Evaluationmantenedor')

.controller('evaluation.viewtipoController', ['$scope','tipo','apiServices','$location', 
	function($scope,tipo,apiServices,$location){
		
		$scope.tipo=tipo.data;

		$scope.remove=function(key){
			apiServices.model('evaluacionteorica').remove($scope.evaluations[key].id).then(function(q) {
				$scope.evaluations.splice(key,1);
				toastr.success("Se ha eliminado con exito.","Exito");
			},function(q) {
				toastr.error("Codigo : "+q.status,"Error");
			})
		}


	}])