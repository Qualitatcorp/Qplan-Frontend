angular.module('Perfil')

.controller('perfil.editperfilController', ['$scope','perfil','apiServices','$location','toastr', function($scope,perfil,apiServices,$location,toastr){
	
	$scope.perfil=perfil.data;
	$scope.clasificaciones = [];

	apiServices.model('clasificacionperfil').params({"per_id":$scope.perfil.id}).search().
	then(function(q){
			$scope.clasificaciones=q.data;
			$scope.clasificaciones.forEach(function(elemento){
			apiServices.model('clasificacion').get(elemento.cla_id).then(function(m){
			elemento.clasificacion = m.data;
				})
			});
		});

	

	$scope.getClasificaciones=function(texto){
		return apiServices.model('clasificacion').params({nombre:texto}).search().then(
			function(promise){
				return promise.data;
			}
			);
	}

	$scope.save=function(){
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
	};
}])