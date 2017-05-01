/**
* empresa.adminController Module
*
* Carga la informacion de las evaluaciones
*/
angular.module('Evaluationmantenedor')

.controller('evaluation.admincategoriaController', ['categorias','$scope','apiServices','toastr',function(categorias,$scope,apiServices,toastr){


	$scope.categorias = categorias.data;

	var total = categorias.headers('x-pagination-total-count');

	$scope.totalItems = parseInt(total);
	$scope.currentPage = 1;
	$scope.pageItems = 20;

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function(page) {

		apiServices.model('clasificacioncategoria').page(page).get().then(
			function (q) {
				$scope.categorias = q.data;
			}
			);

	};

	$scope.remove=function(key){
		apiServices.model('clasificacioncategoria').remove($scope.categorias[key].id).then(function(q) {
			$scope.categorias.splice(key,1);
			toastr.success("Se ha eliminado con exito.","Exito");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}

}])