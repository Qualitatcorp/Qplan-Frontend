angular.module('Worker')

.controller('worker.viewController', ['toastr','apiServices','$scope','worker','trabajadorServices','comunaServices','paisServices','$location', function(toastr,apiServices,$scope,worker,trabajadorServices,comunaServices,paisServices,$location){
	$scope.back=function() {
		window.history.back();
	};
	$scope.worker=worker.data;

	$scope.remove=function(id){
		apiServices.model('trabajador').remove(id).then(function(q) {
			toastr.success("Se ha eliminado con exito.","Exito");
			window.history.back();
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}

}])