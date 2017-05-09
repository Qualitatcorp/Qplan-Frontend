angular.module('Perfil')

.controller('perfil.viewperfilController', ['toastr','apiServices','$scope','perfil','$location', function(toastr,apiServices,$scope,perfil,$location){
	
	$scope.perfil=perfil.data;

		$scope.remove=function(id){
		apiServices.model('perfil').remove(id).then(function(q) {
			toastr.success("Se ha eliminado con exito.","Exito");
			$location.path("perfil/admin");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}

}])