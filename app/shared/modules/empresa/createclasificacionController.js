angular.module('Empresa')

.controller('empresa.createclasificacionController', ['$scope','apiServices','$location','toastr', function($scope,apiServices,$location,toastr){
	
	$scope.empresa={}

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