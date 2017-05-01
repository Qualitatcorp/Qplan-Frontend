angular.module('Empresa')

.controller('empresa.createController', ['$scope','apiServices','$location','toastr', function($scope,apiServices,$location,toastr){
	
	$scope.empresa={}


	$scope.select={
		habilitado:["SI","NO"]
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


	$scope.getPaises=function(texto){
		return apiServices.model('pais').params({nombre:texto}).search().then(
			function(promise){
				return promise.data;
			}
			);
	}

	$scope.getComunas=function(texto){
		return apiServices.model('comuna').params({nombre:texto}).search().then(
			function(promise){
				return promise.data;
			}
			);
	}

	$scope.save=function() {
		apiServices.model('empresa').save($scope.empresa).
		then(function(q){
			$location.path("empresa");
			toastr.success("Se ha registrado la empresa con exito.","Exito");
		},
		function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		});
	}
}])