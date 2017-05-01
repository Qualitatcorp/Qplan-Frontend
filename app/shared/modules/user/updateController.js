/**
* user.adminController Module
*
* Carga la informacion del los usuarios
*/
angular.module('User')
.controller('user.updateController', ['$scope','toastr','$location','userServices','model',function($scope,toastr,$location,userServices,model){
	$scope.model=model.data;
	if($scope.model.nacimiento)
		$scope.model.nacimiento=new Date($scope.model.nacimiento);
	$scope.back=function() {
		window.history.back();
	}
	$scope.save=function(model){
		userServices.save(model).then(function(q){
			toastr.success("Se han guardado los cambios.","Exito");
			$location.path("users/admin");
		},function(q){
			switch(q.status){
				case 422:
					q.data.forEach(function(error){
						toastr.error(error.message,"¡Error!");
					});
				break;
			}
		})
	}
}])