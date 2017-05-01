angular.module('Perfil')

.controller('perfil.createperfilController', ['$scope','apiServices','$location','toastr', function($scope,apiServices,$location,toastr){
	
	$scope.perfil={}


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