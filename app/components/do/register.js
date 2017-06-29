'use strict';
angular.module('do')
.controller('do.registerCtrl', [
	'$scope',
	'$location',
	'$filter',
	'toastr',
	'trabajadorStorage',
	'apiServices',
	'OT',
function(
	$scope,
	$location,
	$filter,
	toastr,
	trabajadorStorage,
	api,
	OT
	){

	// Registro de Servicios
	var trabajadorServices=api.model('trabajador'),
	fichaServices=api.model('ficha'),
	otTrabajoServices=api.model('ordentrabajotrabajador');

	$scope.model={pais_id:60};
	$scope.$watch('model.rut',function(){
		$scope.model.rut = $filter('CIE')($scope.model.rut);
	});



	var registerOtTrabajador=function(trabajador){
		otTrabajoServices.params({ot_id:OT,tra_id:trabajador.id}).search().then(
			function(q){
				registerFicha(OT,trabajador.id);
			},
			function(q){
				otTrabajoServices.save({ot_id:OT,tra_id:trabajador.id}).then(
					function(e){
						registerFicha(OT,trabajador.id);
					},function(e){
						registerFicha(OT,trabajador.id);
					});
			}
		);
	}, registerFicha=function(ot_id,tra_id){
		fichaServices.params({ot_id:ot_id,tra_id:tra_id}).search().then(function(q){
			trabajadorStorage.q=q.data[0];
			$location.path('/evaluation');
		},function(q){
			fichaServices.save({ot_id:ot_id,tra_id:tra_id,proceso:"PENDIENTE"}).then(function(e) {
				trabajadorStorage.q=e.data;
				$location.path('/evaluation');
			},function(e) {
				console.log(e);
			})

		});
	}

	$scope.find=function(){
		console.log($scope.model.rut.length);
		if($scope.model.rut.length>11){
			trabajadorServices.params({rut:$filter('CIE')($scope.model.rut)}).search().then(function(q){
				console.log(q.data[0]);
				q.data[0].nacimiento=new Date(q.data[0].nacimiento);
				$scope.model=q.data[0];
			});
		}
	}

	$scope.clear=function(){
		$scope.model={pais_id:60};
	}

	$scope.register=function(){
		if($scope.model.rut.length==13){
			if($scope.model.nacimiento)
				$scope.model.nacimiento=$scope.model.nacimiento.toISOString().split('T')[0];
			trabajadorServices.save($scope.model).then(
				function(q){
					registerOtTrabajador(q.data);
				},function(q){
					console.warn(q);
				}
			)
		}else{
			toastr.warning('Ingrese su cedula de identidad y electoral.','¡Atención!')
		}
	};

}])