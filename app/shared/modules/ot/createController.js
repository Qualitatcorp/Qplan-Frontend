/**
* user Module
*
* modulo para user
*/
angular.module('Ot')
.controller('ot.createController', ['$scope','toastr','$location','apiServices',function($scope,toastr,$location,api){
	$scope.model={
		estado:"ABIERTO"
	}
	solicitudServices=api.model('ordentrabajosolicitud');
	solicitudServices.expand('empresa').getAll().then(function(q) {
		$scope.solicitud=q.data;
		console.log(q);
	});
	especialidadServices=api.model('especialidad');
	especialidadServices.getAll().then(function(q) {
		$scope.especialidad=q.data;
		console.log(q);
	});
	perfilServices=api.model('perfil');
	perfilServices.getAll().then(function(q) {
		$scope.perfil=q.data;
		console.log(q);
	});
	empresaServices=api.model('empresa');
	empresaServices.getAll().then(function(q) {
		$scope.empresas=q.data;
		console.log(q);
	});
	otServices=api.model('ordentrabajo');
	$scope.back=function() {
		window.history.back();
	};

	$scope.save=function(){
		console.log($scope.model);
		otServices.save($scope.model).then(function(q){

			toastr.success("Se ha creado una nueva ot.","Exito");
			$location.path('/ot/'+q.data.id);
		},function(q){
			switch(q.status){
				case 422:
					q.data.forEach(function(error){
						toastr.error(error.message,"¡Error!");
					});
				break;
			}
			console.warn(q);
		})
	}
}])