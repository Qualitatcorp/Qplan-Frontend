/**
* user.adminController Module
*
* Carga la informacion del los usuarios
*/
angular.module('User')
.controller('resource.adminController', ['$scope','toastr','$location','apiServices','models',function($scope,toastr,$location,apiServices,models){
	console.log(models);
	$scope.models=models.data;

	// var total = models.headers('x-pagination-total-count');

	// $scope.totalItems = parseInt(total);
	// $scope.currentPage = 1;
	// $scope.pageItems = 20;

	// $scope.setPage = function (pageNo) {
	// 	$scope.currentPage = pageNo;
	// };

	// $scope.pageChanged = function(page) {

	// 	apiServices.model('user').page(page).get().then(
	// 		function (q) {
	// 			$scope.models = q.data;
	// 		}
	// 		);

	// };

	// $scope.remove=function(key){
	// 	modelservices.remove($scope.models[key].id).then(function(q) {
	// 		$scope.models.splice(key,1);
	// 		toastr.success("Se ha eliminado con exito.","Exito");
	// 	},function(q) {
	// 		toastr.error("Codigo : "+q.status,"Error");
	// 	})
	// }
}])