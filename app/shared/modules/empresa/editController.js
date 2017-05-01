angular.module('Empresa')

.controller('empresa.editController', ['$scope','empresa','empresaServices','comunaServices','paisServices','$location', function($scope,empresa,empresaServices,comunaServices,paisServices,$location){
	
	$scope.empresa=empresa.data;

	$scope.select={
		habilitado:["SI","NO"]
	}

	comunaServices.get($scope.empresa.com_id).then(
		function(q) {
			$scope.interface.comuna=q.data;
		}
		);

	paisServices.get($scope.empresa.pais_id).then(
		function(q) {
			$scope.interface.pais=q.data;
		}
		);

	$scope.getPaises=function(texto){
		return paisServices.search({nombre:texto}).then(
			function(promise){
				return promise.data;
			}
			);
	}

	$scope.getComunas=function(texto){
		return comunaServices.search({nombre:texto}).then(
			function(promise){
				return promise.data;
			}
			);
	}

	$scope.interface={

		set comuna(value){
			$scope.empresa.comuna=value;
			if(angular.isObject($scope.empresa.comuna)){
				$scope.empresa.com_id=$scope.empresa.comuna.com_id;
			}
		},
		get comuna(){
			if(angular.isObject($scope.empresa.comuna))
				return $scope.empresa.comuna.nombre;
			return $scope.empresa.comuna;
		},
		set pais(value){
			$scope.empresa.pais=value;
			if(angular.isObject($scope.empresa.pais)){
				$scope.empresa.pais_id=$scope.empresa.pais.id;
			}
		},
		get pais(){
			if(angular.isObject($scope.empresa.pais))
				return $scope.empresa.pais.nombre;
			return $scope.empresa.pais;
		}
	}

	$scope.save=function(){
		empresaServices.save($scope.empresa)
		.then(
			function(q) {
				console.log(q);
				$location.path("empresa");
			},
			function error(q) {
				console.warn(q);
			}
			);
	};
}])