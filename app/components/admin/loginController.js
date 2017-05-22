angular.module("admin")
.controller('loginController', ['$location','$scope','$route','authenticationServices','sessionServices','toastr',
function($location,$scope,$route,auth,session,toastr){
		$scope.submit=function () {
		auth.credential($scope.login.username,$scope.login.password,"true",'user').then(
			function(success){
				console.log(success);
				session.token=success.data.access_token;
				session.refresh=success.data.refresh;
				session.expire_in=success.data.expire_in;
				session.scope=success.data.scope;
				/*window.history.back();*/
				toastr.success("Ha ingresado exitosamente al sistema.","Exito");
				$location.path("inicio");
			},
			function(error){
				switch(error.status){
					case 401:
						toastr.warning('Usuario o contraseña incorrecta.','Atención');
						break;
					case 500:
						toastr.info('Servicio no disponible.','Información');
					default:
						toastr.error('Sin acceso a internet.','Información');
						console.log(error);
				}
			}
		)
	}
}])