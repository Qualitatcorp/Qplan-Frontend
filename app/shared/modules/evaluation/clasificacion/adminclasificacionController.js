/**
* empresa.adminController Module
*
* Carga la informacion de las evaluaciones
*/
angular.module('Evaluationmantenedor')

.controller('evaluation.adminclasificacionController', ['clasificaciones','$scope','apiServices','toastr',function(clasificaciones,$scope,apiServices,toastr){


	$scope.clasificaciones = clasificaciones.data;

	console.log($scope.clasificaciones);

	var total = clasificaciones.headers('x-pagination-total-count');

	$scope.totalItems = parseInt(total);
	$scope.currentPage = 1;
	$scope.pageItems = 20;

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function(page) {

		apiServices.model('clasificacion').page(page).get().then(
			function (q) {
				$scope.clasificaciones = q.data;
			}
			);

	};

	$scope.remove=function(key){
		apiServices.model('clasificacion').remove($scope.clasificaciones[key].id).then(function(q) {
			$scope.clasificaciones.splice(key,1);
			toastr.success("Se ha eliminado con exito.","Exito");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}

}])