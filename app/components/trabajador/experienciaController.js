'use strict'
angular.module('trabajador')

.controller('experienciaController', ['$filter','trabajadorStorage','$modal','$scope','$location','apiServices','toastr',
	function($filter,trabajadorStorage,$modal,$scope,$location,api,toastr){
		console.log(trabajadorStorage);
		var playAudio=function(src){
			var audio = document.getElementById('player');
				audio.src=src;
				audio.play();
		}
		playAudio($filter('dinamicSource')('src/audio/trabajador/experiencialaboral.m4a'));
		$scope.rubros=['Rubro Minero','Rubro Forestal','Rubro Energía','Rubro Petroleo','Rubro Metal-Mecánico','Rubro Telecomunicaciones'];
		var experienciaServices = api.model('trabajadorexperiencia');
		var trabajador=trabajadorStorage.q;
		var trabajador_id=trabajador.id;

		/*var cargo_id = 1;*/


		$scope.select = {
			numbers:[0,1,2,3,4,5,6,7,8,9]
		}

		$scope.inputs = _.map(trabajador.experiencias,function(m) {
			m.meses=parseInt(m.meses);
			return m;
		});
		var contador=_.countBy(trabajador.experiencias,function (q) {
		 return q.tipo
		});
		console.log(contador);

		$scope.faenas = contador.FAENA|0;
		$scope.proyectos = contador.PROYECTO|0;
		$scope.estables = contador.ESTABLE|0;

		$scope.tooltipfaena = {title: 'Hola, debes seleccionar la cantidad de experiencias en faenas que has hecho', checked: false};
		$scope.tooltipestable = {title: 'Hola, debes seleccionar la cantidad de experiencias en servicios estables que has hecho', checked: false};
		$scope.tooltipproyecto = {title: 'Hola, debes seleccionar la cantidad de experiencias en proyecto que has hecho', checked: false};

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

		$scope.guardar=function() {
			
			var longitud = $scope.inputs.length;
			var i=1;
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
