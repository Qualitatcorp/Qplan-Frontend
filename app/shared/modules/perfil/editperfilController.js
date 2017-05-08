angular.module('Perfil')

.controller('perfil.editperfilController', ['$scope','perfil','apiServices','$location', function($scope,perfil,apiServices,$location){
	
	$scope.perfil=perfil.data;
	$scope.clasificaciones = [];

	apiServices.model('clasificacionperfil').params({"per_id":$scope.perfil.id}).search().
	then(function(q){
			$scope.clasificaciones=q.data;
		});

	$scope.save=function(){
		perfilServices.save($scope.perfil)
		.then(
			function(q) {
				$location.path("perfil");
				toastr.success("Se ha editado el perfil con exito.","Exito");
			},
			function error(q) {
				toastr.error("Codigo : "+q.status,"Error");
			}
			);
	};
}])