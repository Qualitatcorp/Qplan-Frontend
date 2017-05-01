/**
* user Module
*
* modulo para user
*/
angular.module('Ot')
.controller('ot.createTrabajadorController', ['$scope','toastr','apiServices','RutHelper','$routeParams',function($scope,toastr,Api,RutHelper,$routeParams){
	// Iniciando Servicio
	$scope.model={
		rut:"",
		nombre:"",
		paterno:"",
		materno:""
	}
	$scope.clear=function() {
		$scope.model={
			rut:"",
			nombre:"",
			paterno:"",
			materno:""
		}
	}
	var api={
		Ott:Api.model("ordentrabajotrabajador"),
		Trabajador:Api.model("trabajador")
	}
	$scope.exists=function(rut) {
		if(rut){
			api.Trabajador.search({rut:RutHelper.format(rut)}).then(
				function(q) {
					$scope.model=q.data[0];
				},function (q) {
					console.warn(q);
				})
			console.log(RutHelper.format(rut));
		}
	}
	$scope.save=function(model){
		model.rut=RutHelper.format(model.rut);
		api.Trabajador.save(model).then(
		function(q) {
			api.Ott.save({ot_id:$routeParams.id,tra_id:q.data.id}).then(function(e) {
				window.history.back();
			},function(e) {
				toastr.info("El trabajador ya esta asignado","Información");
			})
		},function(q) {
			q.data.forEach(function(error) {
				toastr.error("Error "+error,"Error");
			})
		})
	}
}])