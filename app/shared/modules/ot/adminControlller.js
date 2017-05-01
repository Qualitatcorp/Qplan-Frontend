/**
* user Module
*
* modulo para user
*/
angular.module('Ot')
.controller('ot.adminController', ['$scope','toastr','$location','services','list',function($scope,toastr,$location,services,list){
	$scope.list=list.data;
}])