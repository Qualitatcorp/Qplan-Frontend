/**
* empresa.adminController Module
*
* Carga la informacion de las evaluaciones
*/
angular.module('Evaluationmantenedor')

.controller('evaluation.admintipoController', ['tipos','$scope','apiServices',function(tipos,$scope,apiServices){

	$scope.tipos = tipos.data;

	var total = tipos.headers('x-pagination-total-count');

	$scope.totalItems = parseInt(total);
	$scope.currentPage = 1;
	$scope.pageItems = 20;

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function(page) {

		apiServices.model('evaluaciontipo').page(page).get().then(
			function (q) {
				$scope.tipos = q.data;
			}
			);

	};

	$scope.remove=function(key){
		apiServices.model('evaluaciontipo').remove($scope.tipos[key].id).then(function(q) {
			$scope.tipos.splice(key,1);
			toastr.success("Se ha eliminado con exito.","Exito");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}

}])