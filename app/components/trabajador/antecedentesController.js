'use strict'
angular.module('trabajador')
.controller('antecendentesController', ['$scope','$location','apiServices','trabajadorStorage','toastr','$filter',
	function($scope,$location,api,trabajadorStorage,toastr,$filter){
		var playAudio=function(src){
			var audio = document.getElementById('player');
				audio.src=src;
				audio.play().then(
					function() {
					},function(e) {
						audio.src=src;
						audio.play()
					}
				);
		}
		playAudio($filter('dinamicSource')("src/audio/trabajador/antecendes.m4a"));
		var paisServices=api.model('pais'),
			comunaServices=api.model('comuna'),
			trabajadorServices=api.model('trabajador');
		$scope.trabajador=trabajadorStorage.q;

		$scope.Select={
			niveles:["Basica completa","Media incompleta","Media completa","Tecnica","Técnico en nivel superior incompleta","Técnico en nivel superior","Profesional incompleta","Profesional"],
			licencias:["A1","A2","A3","A4","A5","B","C","D","E","F"],
			estado_civil:["SOLTERO/A","CASADO/A","DIVORCIADO/A","SEPARADO","CONVIVIENTE"],
			tallas:['XXS','XS','S','M','L','XL','XXL','XXXL'],
			afp:['AFP Cuprum','AFP Habitat','AFP PlanVital','ProVida AFP','AFP Capital','AFP Modelo'],
			salud:['FONASA','BANMEDICA','CONSALUD','CRUZ BLANCA','ING','CAPREDENA','DIPRECA','MASVIDA','SIN PREVISIÓN'],
			sexo: ['MASCULINO','FEMENINO']
		}
		$scope.interface={
			set comuna(value){
				$scope.trabajador.comuna=value;
				if(angular.isObject($scope.trabajador.comuna)){
					$scope.trabajador.com_id=$scope.trabajador.comuna.com_id;
				}
			},
			get comuna(){
				if(angular.isObject($scope.trabajador.comuna))
					return $scope.trabajador.comuna.nombre;
				return $scope.trabajador.comuna;
			},
			set pais(value){
				$scope.trabajador.pais=value;
				if(angular.isObject($scope.trabajador.pais)){
					$scope.trabajador.pais_id=$scope.trabajador.pais.id;
				}
			},
			get pais(){
				if(angular.isObject($scope.trabajador.pais))
					return $scope.trabajador.pais.nombre;
				return $scope.trabajador.pais;
			}
		}
		if($scope.trabajador.licencia)
			$scope.interface.licencia=$scope.trabajador.licencia.split(',');
		$scope.getPaises=function(texto){
			return paisServices.params({nombre:texto}).search().then(
				function(promise){
					return promise.data;
				}
				);
		}	
		$scope.getComuna=function(texto){
			return comunaServices.params({nombre:texto}).search().then(
				function(promise){
					return promise.data;
				}
				);
		}
		$scope.siguiente=function(){
			if($scope.trabajador.licencia)
			$scope.trabajador.licencia=$scope.interface.licencia.join(',');
			trabajadorServices.save($scope.trabajador).then(
				function(q){
					var ficha ={};
					ficha.ot_id = trabajadorStorage.q.ot.id;
					ficha.tra_id = trabajadorStorage.q.id;
					ficha.proceso = 'EN PROGRESO TEORICO';
					api.model('ficha').save(ficha).then(
						function(q){
							console.log(q);
							$location.path('experiencia');
						});
				},
				function(q){
					console.log(q);
					toastr.success('La información ingresada no esta completamente correcta.', 'Atentcion!');
				}
				);
		}
	}
])