'user strict'
angular.module('trabajador')
.controller('loginController', [
		'$scope',
		'$location',
		'trabajadorStorage',
		'apiServices',
		'RutHelper',
		'toastr',
		'sessionServices',
		'authenticationServices',
		'$filter',
	function(
		$scope,
		$location,
		trabajadorStorage,
		apiServices,
		RutHelper,
		toastr,
		session,
		auth,
		$filter
	){
		var playAudio=function(src){
			var audio = document.getElementById('player');
				audio.src=src;
				audio.play().then(function(q) {
					console.log(q);
				},function(q) {
					console.log(q);
				});
		}
		playAudio($filter('dinamicSource')('src/audio/trabajador/ingresorut.m4a'));
		var trabajadorServices=apiServices.model("trabajador");
		$scope.login=function(){
			trabajadorServices.params({rut:RutHelper.format($scope.rut)}).search().then(
				function success(q){
					trabajadorServices.expand('ot,experiencias').get(q.data[0].id).then(
						function(t){
							if(t.data.ot){
								trabajadorStorage.q=t.data;
								$location.path('antecendentes');
							}else{
								playAudio("src/audio/trabajador/acercarse.m4a");
								toastr.warning('Usted no se encuentra registrado en una orden de trabajo activa, favor acercarse al encargado.', 'Atención');
							}
						}
					);
				},
				function error(q){
					switch(q.status){
						case 404 : toastr.error('Usted no se encuentra registrado en el sistema, favor solicitar ayuda.', 'Atención');
					}
					console.warn(q);
				}
			);
		}
	}
])