/**
* empresa.adminController Module
*
* Carga la informacion de los trabajadores
*/
angular.module('Worker')

.controller('worker.adminController', ['workers','$scope','apiServices',function(workers,$scope,apiServices){

	$scope.workers = workers.data;

	var total = workers.headers('x-pagination-total-count');

	$scope.totalItems = parseInt(total);
	$scope.currentPage = 1;
	$scope.pageItems = 20;

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function(page) {

		apiServices.model('trabajador').page(page).get().then(
			function (q) {
				$scope.workers = q.data;
			}
			);

	};

	$scope.remove=function(key){
		apiServices.model('trabajador').remove($scope.workers[key].id).then(function(q) {
			$scope.workers.splice(key,1);
			toastr.success("Se ha eliminado con exito.","Exito");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}
/*
	$scope.save=function(model){
		empresaServices.save(model).then(function(q){console.log(q)});
	}*/

}])