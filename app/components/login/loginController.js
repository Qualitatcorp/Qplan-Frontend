"use strict"
/**
* login Module
*
* Authentificacion de Usuario
*/
angular.module('login', ['ApiRest'])
.controller('loginController', ['$scope','Authentication','$window','toastr', function($scope,Authentication,$window,toastr){
	$scope.login={
		username:null,
		password:null,
		error:[],
		submit:function() {
			var auth=Authentication.credential(this.username,this.password).then(
				function successCallback(response){
					Authentication.identity=response.data;
					console.log("Paso a la siguiente pagina");
					toastr.success("Ha ingresado exitosamente al sistema.","Exito");
					/*$window.location.href = 'admin.html';*/
					$location.path("admin/inicio");
				},
				function errorCallBack(response){
					switch(response.status){
						case 401:
							$scope.login.error={
								type:'warning',
								text:'Contraseña incorrecta.'
							};
							break;
						case 500:
							$scope.login.error={
								type:'danger',
								text:'Servicio no disponible intentelo mas tarde.'
							};
							break;
					}
				});
		}

	};
}])