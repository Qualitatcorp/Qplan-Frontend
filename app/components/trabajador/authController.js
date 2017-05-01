/**
*  Module Trabajador
*
* Encargado de mantener los permisos en el sistema
*/
angular.module('trabajador')
.controller('trabajador.authController', ['sessionServices','authenticationServices','$timeout','toastr', function(session,auth,$timeout,toastr){
	var triggerSession=function() {
			if(session.expire){
				session.logout();
				auth.credential("trabajador-qplan","qualitat-2017","true").then(
					function(success) {
						session.token=success.data.access_token;
						session.refresh=success.data.refresh;
						session.expire_in=success.data.expire_in;
						toastr.success('Inicio del sistema.', 'Atención');
					},function(error) {
						toastr.error('El sistema no se encuentra disponible en este momento', 'Atención');
					}
				);
			}else{
				if(session.timeOut.getMinutes()<10){
					console.log("Necesita refrescar session");
					auth.renovate().then(function(success) {
						console.log(success);
						session.refresh=success.data.refresh;
						session.expire_in=success.data.expire_in;
						toastr.success('Actualizando sistema.', 'Atención');
					},function(error) {
						toastr.error('El sistema no se encuentra disponible en este momento', 'Atención');
					})
				}
			}
			$timeout(triggerSession,1000*60);
	}
	$timeout(triggerSession);
}])