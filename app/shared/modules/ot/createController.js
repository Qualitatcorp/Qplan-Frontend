/**
* user Module
*
* modulo para user
*/
angular.module('Ot')
.controller('ot.createController', ['$scope','toastr','$location','services',function($scope,toastr,$location,services){
	$scope.back=function() {
		window.history.back();
	};
	$scope.save=function(model){
		services.save(model).then(function(q){
			toastr.success("Se ha creado un nuevo usuario.","Exito");
			$location.path("users/admin");
		},function(q){
			switch(q.status){
				case 422:
					q.data.forEach(function(error){
						toastr.error(error.message,"¡Error!");
					});
				break;
			}
			console.warn(q);
		})
	}
}])