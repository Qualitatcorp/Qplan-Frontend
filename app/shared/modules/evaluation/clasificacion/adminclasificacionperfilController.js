/**
* empresa.adminController Module
*
* Carga la informacion de las evaluaciones
*/
angular.module('Evaluationmantenedor')

.controller('evaluation.adminclasificacionperfilController', ['clasificacionperfiles','$scope','apiServices','toastr',
	function(clasificacionperfiles,$scope,apiServices,toastr){


	$scope.clasificacionperfiles = clasificacionperfiles.data;

	console.log($scope.clasificacionperfiles);

	var total = clasificacionperfiles.headers('x-pagination-total-count');

	$scope.totalItems = parseInt(total);
	$scope.currentPage = 1;
	$scope.pageItems = 20;

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function(page) {

		apiServices.model('clasificacionperfil').page(page).get().then(
			function (q) {
				$scope.clasificacionperfiles = q.data;
			}
			);

	};

	$scope.remove=function(key){
		apiServices.model('clasificacionperfil').remove($scope.clasificacionperfiles[key].id).then(function(q) {
			$scope.clasificacionperfiles.splice(key,1);
			toastr.success("Se ha eliminado con exito.","Exito");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}

}])