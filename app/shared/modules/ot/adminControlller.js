/**
* user Module
*
* modulo para user
*/
angular.module('Ot')
.controller('ot.adminController', ['$scope','toastr','$location','list',function($scope,toastr,$location,list){
	console.log("hoa");
	$scope.list=list.data;
}])