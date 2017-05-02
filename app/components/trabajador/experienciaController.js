'use strict'
angular.module('trabajador')

.controller('experienciaController', ['$filter','trabajadorStorage','$modal','$scope','$location','apiServices','toastr',
	function($filter,trabajadorStorage,$modal,$scope,$location,api,toastr){
		var playAudio=function(src){
			var audio = document.getElementById('player');
				audio.src=src;
				audio.play();
		}
		playAudio($filter('dinamicSource')('src/audio/trabajador/experiencialaboral.m4a'));
		var experienciaServices = api.model('trabajadorexperiencia'),
			cargoServices = api.model('especialidadcargo');
			
		var trabajador_id=trabajadorStorage.q.id;
		/*var cargo_id = 1;*/


		$scope.select = {
			numbers:[0,1,2,3,4,5,6,7,8,9]
		}

		$scope.inputs = [];
		$scope.faenas = 0;
		$scope.proyectos = 0;
		$scope.estables = 0;
		$scope.getallCargo = {};

		$scope.tooltipfaena = {title: 'Hola, debes seleccionar la cantidad de experiencias en faenas que has hecho', checked: false};
		$scope.tooltipestable = {title: 'Hola, debes seleccionar la cantidad de experiencias en servicios estables que has hecho', checked: false};
		$scope.tooltipproyecto = {title: 'Hola, debes seleccionar la cantidad de experiencias en proyecto que has hecho', checked: false};


		cargoServices.getAll().then(function(response) {

			$scope.getallCargo = response.data;

		});

		$scope.addInputs = function(numero,tipo) {
			

			var filtro = $scope.inputs.filter(function(obj) {
				return (obj.tipo === tipo);
			});

			var number = numero;
			var longscope = filtro.length;
			var resta = number-longscope;

			if (resta >= 0) {

				for (var i = 1; i <= resta; i++) {
					var newItemNo = $scope.inputs.length+1;
					$scope.inputs.push({'tipo':tipo, tra_id: trabajador_id});
				}

			}
			
			else if (resta < 0) {

				var temp=resta*-1;

				for(var i = $scope.inputs.length - 1; i >= 0; i--){

					if($scope.inputs[i].tipo == tipo && temp > 0){
						$scope.inputs.splice(i,1);
						temp--;
					}

				}

			}			

		}


		$scope.getCargo=function(texto){
			if(texto.length>2){
				return cargoServices.search({nombre:texto}).then(
					function(promise){
						return promise.data;
					}
					);
			}
		}


		$scope.guardar=function() {
			
			var longitud = $scope.inputs.length;
			var i=1;

			$scope.inputs.forEach(function(elemento){
				elemento.car_id=elemento.cargo.id;
			})

			$scope.inputs.forEach(function(elemento){
				experienciaServices.save(elemento).then(
					function success(promise){
						i++;
					});
			})

			if(i=longitud){
				toastr.success('Experiencia agregada exitosamente.', 'Atencion!');
				$location.path('evaluacion');
			}
			else{
				toastr.error('Error al registrar la experiencia. Intente nuevamente', 'Atención');
			}
		}

	}])
