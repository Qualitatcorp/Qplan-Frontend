angular.module('Evaluationmantenedor')

.controller('evaluation.createclasificacionperfilController', ['$scope','apiServices','$location', function($scope,apiServices,$location){
	
	$scope.clasificacionperfil={}

	$scope.interface={

			set clasificacion(value){
				$scope.clasificacionperfil.clasificacion=value;
				if(angular.isObject($scope.clasificacionperfil.clasificacion)){
					$scope.clasificacionperfil.cla_id=$scope.clasificacionperfil.clasificacion.id;
				}
			},
			get clasificacion(){
				if(angular.isObject($scope.clasificacionperfil.clasificacion))
					return $scope.clasificacionperfil.clasificacion.nombre;
				return $scope.clasificacionperfil.clasificacion;
			},
			set perfil(value){
				$scope.clasificacionperfil.perfil=value;
				if(angular.isObject($scope.clasificacionperfil.perfil)){
					$scope.clasificacionperfil.per_id=$scope.clasificacionperfil.perfil.id;
				}
			},
			get perfil(){
				if(angular.isObject($scope.clasificacionperfil.perfil))
					return $scope.clasificacionperfil.perfil.nombre;
				return $scope.clasificacionperfil.perfil;
			}
	}

	$scope.getClasificaciones=function(texto){		
		return apiServices.model('clasificacion').search({nombre:texto}).then(
			function(promise){
				return promise.data;
			}
			);
	}

	$scope.getPerfiles=function(texto){		
		return apiServices.model('perfil').search({nombre:texto}).then(
			function(promise){
				return promise.data;
			}
			);
	}

	$scope.save=function() {
		apiServices.model('clasificacionperfil').save($scope.clasificacionperfil).
		then(function(q){
			console.log(q);
			$location.path("evaluation/adminclasificacionperfil");
		},
		function(q) {
			console.warn(q);
		});
	}
}])