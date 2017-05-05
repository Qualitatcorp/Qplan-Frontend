angular.module('Perfil')

.controller('perfil.createperfilController', ['$scope','apiServices','$location','toastr', function($scope,apiServices,$location,toastr){
	
	$scope.perfil={}

	$scope.clasificaciones = [];

/*	$scope.interface={

		set clasificacion(value){
			$scope.cla.comuna=value;
			if(angular.isObject($scope.empresa.comuna)){
				$scope.empresa.com_id=$scope.empresa.comuna.com_id;
			}
		},
		get clasificacion(){
			if(angular.isObject($scope.empresa.comuna))
				return $scope.empresa.comuna.nombre;
			return $scope.empresa.comuna;
		},
		
	}*/

	$scope.getClasificaciones=function(texto){
		return apiServices.model('clasificacion').params({nombre:texto}).search().then(
			function(promise){
				return promise.data;
			}
			);
	}

	$scope.addNewChoice = function() {		
		$scope.clasificaciones.push({});
	};
	
	$scope.removeChoice = function() {
		var lastItem = $scope.clasificaciones.length-1;
		$scope.clasificaciones.splice(lastItem);
	};

	$scope.save=function() {
		apiServices.model('perfil').save($scope.perfil).
		then(function(q){
			$location.path("perfil");
			toastr.success("Se ha registrado el perfil con exito.","Exito");
		},
		function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		});
	}
}])