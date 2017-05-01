/**
* user Module
*
* modulo para user
*/
angular.module('Ot')
.controller('ot.updateController', ['$scope','toastr','$location','services','model',function($scope,toastr,$location,services,model){
	$scope.model=model.data;
	if($scope.model.nacimiento)
		$scope.model.nacimiento=new Date($scope.model.nacimiento);
	$scope.back=function() {
		window.history.back();
	}
	$scope.save=function(model){
		services.save(model).then(function(q){
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