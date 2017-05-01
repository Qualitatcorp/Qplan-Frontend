angular.module('Perfil')

.controller('perfil.viewperfilController', ['$scope','perfil','$location', function($scope,perfil,$location){
	
	$scope.perfil=perfil.data;

}])