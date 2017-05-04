/**
* trabajador Module by rbn
*/
angular.module('trabajador').controller('configController', ['$scope', 'toastr',function($scope,toastr){
	if(localStorage&&localStorage.resource_endpoint)
		$scope.HostSrc=localStorage.resource_endpoint;
	$scope.saveHostingSrc=function() {
		if($scope.HostSrc){
			localStorage.resource_endpoint=$scope.HostSrc;
			toastr.success('Se ha guardado el Host Alternativo','Exito');
		}
	}
	$scope.removeHostingSrc=function() {
		if($scope.HostSrc){
			$scope.HostSrc="";
			localStorage.removeItem("resource_endpoint");
			toastr.success('Se ha guardado el Host Alternativo','Exito');
		}
	}
}])