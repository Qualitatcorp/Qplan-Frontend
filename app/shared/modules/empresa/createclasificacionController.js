angular.module('Empresa')

.controller('empresa.createclasificacionController', ['$scope','apiServices','$location','toastr', function($scope,apiServices,$location,toastr){
	
	$scope.empresaclasificacion={}

	$scope.save=function() {
		apiServices.model('empresaclasificacion').save($scope.empresaclasificacion).
		then(function(q){
			$location.path("empresaclasificacion");
			toastr.success("Se ha registrado la clasificacion con éxito.","Exito");
		},
		function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		});
	}
}])