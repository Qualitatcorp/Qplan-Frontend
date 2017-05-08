angular.module('Perfil')

.controller('perfil.createperfilController', ['$scope','apiServices','$location','toastr', function($scope,apiServices,$location,toastr){
	
	$scope.perfil={}

	$scope.clasificaciones = [];

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
			$scope.clasificaciones.forEach(function(elemento){
			elemento.cla_id = elemento.clasificacion.id;
			elemento.per_id = q.data.id;
			apiServices.model('clasificacionperfil').save(elemento).then(function(m){
			console.log(m);
				})
			})
			$location.path("perfil/admin");
			toastr.success("Se ha registrado el perfil con exito.","Exito");
		},
		function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		});
	}
}])