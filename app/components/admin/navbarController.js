angular.module('admin')
.controller('navbarController', 
	['$scope','toastr','$location','sessionServices','apiServices','$timeout','$uibModal','$route',
	function($scope,toastr,$location,session,apiServices,$timeout,$uibModal,$route){
		$scope.$on('$routeChangeError',function(event,current,prev,reject) {
			switch(reject.status){
				case 401:
					toastr.error('Tus credenciales han expirado','Error');
					reLogin();
					break;
			}
		});
		$scope.menu=[];
		var	sessionStatus=function() {
				if(session.expire){
					$scope.menu=[];
					$timeout(sessionStatus,1000);
				}else{
					if($scope.menu.length==0){
							$scope.menu=[
								{"name":"Administración","items":[{"label":"Sistema","items":[{"label":"Usuarios","href":"users/admin"},{"label":"Roles","href":"role"},{"label":"Recursos","href":"resource"},{"label":"Clientes","href":"clients"},{"label":"Accesos","href":"access"}]}]},
								{"name":"Empresa","items":[{"label":"Empresa","items":[{"label":"Crear","href":"empresa/create"},{"label":"Administrar","href":"empresa"}]}]},
								{"name":"Orden de Servicio","items":[{"label":"Orden de Servicio","items":[{"label":"Crear","href":"ot/create"},{"label":"Administrar","href":"ot/admin"}]}]},
								{"name":"Trabajador","items":[{"label":"Trabajadores","items":[{"label":"Crear","href":"worker/create"},{"label":"Administrar","href":"worker/admin"}]}]},
								{"name":"Evaluación","items":[{"label":"Clasificación","items":[{"label":"Crear Categoría","href":"evaluation/createcategoria"},{"label":"Administrar Categoría","href":"evaluation/admincategoria"},{"label":"Crear Clasificación","href":"evaluation/createclasificacion"},{"label":"Administrar Clasificación","href":"evaluation/adminclasificacion"},{"label":"Crear Clasificación-Perfil","href":"evaluation/createclasificacionperfil"},{"label":"Administrar Clasificación-Perfil","href":"evaluation/adminclasificacionperfil"}]},{"label":"Evaluación","items":[{"label":"Crear Evaluación","href":"evaluation/createevaluation"},{"label":"Administrar Evaluación","href":"evaluation/adminevaluation"},{"label":"Crear Tipo","href":"evaluation/createtipo"},{"label":"Administrar Tipo","href":"evaluation/admintipo"}]},{"label":"Fichas de evaluación","items":[{"label":"Crear","href":"ficha/create"},{"label":"Administrar","href":"ficha/admin"}]}]},
								{"name":"Perfil","items":[{"label":"Perfil","items":[{"label":"Crear","href":"perfil/create"},{"label":"Administrar","href":"perfil/admin"}]}]}
							];
					}
					if(session.timeOut.getMinutes()<10){
						refresh();
					}else{
						$timeout(sessionStatus,60000);
					}
					
				}
			},
			reLogin=function() {
				$uibModal.open({
					animation: true,
					templateUrl: 'views/login/modalForm.html',
					size: 'sm',
					controller:['$scope','sessionServices','authenticationServices','$uibModalInstance','toastr',"$route",'$location',function($scope,session,auth,modal,toastr,$route,$location) {
						$scope.model={
							username:"",
							password:""
						}
						$scope.login = function() {
							auth.credential($scope.model.username,$scope.model.password,"true").then(
								function(success){
									session.token=success.data.access_token;
									session.refresh=success.data.refresh;
									session.expire_in=success.data.expire_in;
									$route.reload();
									modal.close();
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
									}
								}
							)
						}; 
					}]
				});
			},
			refresh=function() {
				$uibModal.open({
					animation: true,
					templateUrl: 'views/login/refresh.html',
					size: 'sm',
					controller:['$scope','sessionServices','authenticationServices','$uibModalInstance','toastr',"$route",'$timeout','$location',function($scope,session,auth,modal,toastr,$route,$timeout,$location) {
						$scope.time;
						$scope.updateTime=function() {
							$scope.time=session.timeOut;
							if(session.timeOut.getMinutes()<10&&!session.expire)
								$timeout($scope.updateTime,1000)
							if(session.expire){
								session.logout();
								$location.path('/welcome');
							}
						}
						$timeout($scope.updateTime);
						$scope.refresh = function() {
							auth.renovate().then(function(success) {
								console.log(success);
								session.refresh=success.data.refresh;
								session.expire_in=success.data.expire_in;
								toastr.success('Actualizando sistema.', 'Atención');
								modal.close();
							},function(error) {
								toastr.error('El sistema no se encuentra disponible en este momento', 'Atención');
							})
						};
						$scope.close=function() {
							modal.close();
						}
					}]
				});
			};
		$timeout(sessionStatus);
		$scope.session=session.expire;
		$scope.logout=function(){
			session.logout();
			sessionStorage.clear();
			$route.reload();
			$location.path("inicio");
			console.log("Session limpiada");
		}
	}
])