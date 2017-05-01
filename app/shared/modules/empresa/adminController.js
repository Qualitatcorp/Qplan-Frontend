/**
* empresa.adminController Module
*
* Carga la informacion de las empresas
*/
angular.module('Empresa')

.controller('empresa.adminController', ['empresas','$scope','apiServices','toastr',function(empresas,$scope,apiServices,toastr){

	$scope.empresas = empresas.data;

	var total = empresas.headers('x-pagination-total-count');

	$scope.totalItems = parseInt(total);
	$scope.currentPage = 1;
	$scope.pageItems = 20;

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function(page) {

		apiServices.model('empresa').page(page).get().then(
			function (q) {
				$scope.empresas = q.data;
			}
			);

	};

	$scope.remove=function(key){
		apiServices.model('empresa').remove($scope.empresas[key].id).then(function(q) {
			$scope.empresas.splice(key,1);
			toastr.success("Se ha eliminado con exito.","Exito");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}

}])