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
				audio.play();
				// .then(function(q) {
				// 	console.log(q);
				// },function(q) {
				// 	console.log(q);
				// });
		}
		playAudio($filter('dinamicSource')('src/audio/trabajador/AUTH.mp3'));
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
								playAudio("src/audio/trabajador/AUTH_ERROR1.mp3");
								toastr.warning('Usted no esta registrado en una orden de trabajo,solicite ayuda su instructor.', 'Atención');
							}
						}
					);
				},
				function error(q){
					switch(q.status){

						case 404 : 
							playAudio("src/audio/trabajador/AUTH_ERROR2.mp3");
							toastr.error('Usted no se encuentra registrado en el sistema, por favor solicite ayuda su instructor.', 'Atención');
						break;
					}
					console.warn(q);
				}
			);
		}
	}
])