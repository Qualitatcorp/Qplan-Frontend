angular.module('Empresa')

.controller('empresa.viewController', ['$scope','empresa','empresaServices','comunaServices','paisServices','$location', function($scope,empresa,empresaServices,comunaServices,paisServices,$location){
	
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

}])