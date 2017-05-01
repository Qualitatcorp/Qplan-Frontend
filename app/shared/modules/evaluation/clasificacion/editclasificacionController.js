angular.module('Evaluationmantenedor')

.controller('evaluation.editclasificacionController', ['$scope','clasificacion','apiServices','$location', function($scope,clasificacion,apiServices,$location){
	
	$scope.clasificacion=clasificacion.data;

	
	$scope.interface={

			set categoria(value){
				$scope.clasificacion.categoria=value;
				if(angular.isObject($scope.clasificacion.categoria)){
					$scope.clasificacion.cat_id=$scope.clasificacion.categoria.id;
				}
			},
			get categoria(){
				if(angular.isObject($scope.clasificacion.categoria))
					return $scope.clasificacion.categoria.nombre;
				return $scope.clasificacion.categoria;
			}
		}

	$scope.getCategorias=function(texto){		
		return apiServices.model('clasificacioncategoria').search({nombre:texto}).then(
			function(promise){
				return promise.data;
			}
			);
	}


	$scope.save=function() {
		apiServices.model('clasificacion').save($scope.clasificacion).
		then(function(q){
			console.log(q);
			$location.path("evaluation/adminclasificacion");
		},
		function(q) {
			console.warn(q);
		});
	}
}])