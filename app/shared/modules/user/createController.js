/**
* user.adminController Module
*
* Carga la informacion del los usuarios
*/
angular.module('User')
.controller('user.createController', ['$scope','toastr','$location','userServices',function($scope,toastr,$location,userServices){
	$scope.back=function() {
		window.history.back();
	};
	$scope.save=function(model){
		userServices.save(model).then(function(q){
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