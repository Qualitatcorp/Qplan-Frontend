angular.module('Empresa')

.controller('empresa.viewController', ['apiServices','$scope','empresa','empresaServices','comunaServices','paisServices','$location','toastr', function(apiServices,$scope,empresa,empresaServices,comunaServices,paisServices,$location,toastr){
	
	$scope.empresa=empresa.data;

	var d = $scope.empresa.creada;
	$scope.empresa.creada = d.split(' ')[0];

	comunaServices.get($scope.empresa.com_id).then(
		function(q) {
			$scope.empresa.comuna=q.data;
		}
		);

	paisServices.get($scope.empresa.pais_id).then(
		function(q) {
			$scope.empresa.pais=q.data;
		}
		);

	$scope.remove=function(id){
		apiServices.model('empresa').remove(id).then(function(q) {
			toastr.success("Se ha eliminado con exito.","Exito");
			$location.path("empresa");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}


}])