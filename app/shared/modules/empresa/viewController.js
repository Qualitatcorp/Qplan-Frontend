angular.module('Empresa')

.controller('empresa.viewController', ['apiServices','$scope','empresa','$location','toastr', function(apiServices,$scope,empresa,$location,toastr){
	
	$scope.empresa=empresa.data;

	var d = $scope.empresa.creada;
	$scope.empresa.creada = d.split(' ')[0];

	$scope.remove=function(id){
		apiServices.model('empresa').remove(id).then(function(q) {
			toastr.success("Se ha eliminado con exito.","Exito");
			$location.path("empresa");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}


}])