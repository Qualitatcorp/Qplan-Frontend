/**
* perfil.adminController Module
*
* Carga la informacion de las perfiles
*/
angular.module('Perfil')

.controller('perfil.adminperfilController', ['perfiles','$scope','apiServices','toastr',function(perfiles,$scope,apiServices,toastr){

	$scope.perfiles = perfiles.data;

	var total = perfiles.headers('x-pagination-total-count');

	$scope.totalItems = parseInt(total);
	$scope.currentPage = 1;
	$scope.pageItems = 20;

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function(page) {

		apiServices.model('perfil').page(page).get().then(
			function (q) {
				$scope.perfiles = q.data;
			}
			);

	};

	$scope.remove=function(key){
		apiServices.model('perfil').remove($scope.perfiles[key].id).then(function(q) {
			$scope.perfiles.splice(key,1);
			toastr.success("Se ha eliminado con exito.","Exito");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}

}])