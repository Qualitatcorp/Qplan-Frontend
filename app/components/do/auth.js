'use strict';
angular.module('do')
.controller('do.authCtrl', [
	'$timeout',
	'toastr',
	'authenticationServices',
	'sessionServices',
	function(
		$timeout,
		toastr,
		auth,
		session
	){
		var login=function() {
			session.logout();
			auth.credential("alfabetdigital","alfabet497685","true").then(
				function(success) {
					session.token=success.data.access_token;
					session.refresh=success.data.refresh;
					session.expire_in=success.data.expire_in;
					toastr.success('Inicio del sistema.', 'Atención');
				},function(error) {
					toastr.error('El sistema no se encuentra disponible en este momento', 'Atención');
				}
			);
		},
		triggerSession=function() {
				if(session.expire){
					login();
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
	}
]);