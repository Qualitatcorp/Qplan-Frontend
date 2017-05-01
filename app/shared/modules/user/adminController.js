/**
* user.adminController Module
*
* Carga la informacion del los usuarios
*/
angular.module('User')
.controller('user.adminController', ['$scope','toastr','$location','apiServices','users',function($scope,toastr,$location,apiServices,users){
	
	$scope.users=users.data;

	var total = users.headers('x-pagination-total-count');

	$scope.totalItems = parseInt(total);
	$scope.currentPage = 1;
	$scope.pageItems = 20;

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function(page) {

		apiServices.model('user').page(page).get().then(
			function (q) {
				$scope.users = q.data;
			}
			);

	};

	$scope.remove=function(key){
		userServices.remove($scope.users[key].id).then(function(q) {
			$scope.users.splice(key,1);
			toastr.success("Se ha eliminado con exito.","Exito");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}
}])