angular.module('Evaluationmantenedor')

.controller('evaluation.createevaluationController', ['$scope','apiServices','$location', function($scope,apiServices,$location){
	
	$scope.evaluation={}

	$scope.interface={

		set tipo(value){
			$scope.evaluation.tipo=value;
			if(angular.isObject($scope.evaluation.tipo)){
				$scope.evaluation.tev_id=$scope.evaluation.tipo.id;
			}
		},
		get tipo(){
			if(angular.isObject($scope.evaluation.tipo))
				return $scope.evaluation.tipo.nombre;
			return $scope.evaluation.tipo;
		}
	}


	$scope.getTipos=function(texto){
		return apiServices.model('evaluaciontipo').search({nombre:texto}).then(
			function(promise){
				return promise.data;
			}
			);
	}

	$scope.save=function() {
		apiServices.model('evaluacionteorica').save($scope.evaluation).
		then(function(q){
			console.log(q);
			$location.path("evaluation/adminevaluation");
		},
		function(q) {
			console.warn(q);
		});
	}
}])