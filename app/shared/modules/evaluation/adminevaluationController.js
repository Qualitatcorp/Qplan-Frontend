/**
* empresa.adminController Module
*
* Carga la informacion de las evaluaciones
*/
angular.module('Evaluationmantenedor')

.controller('evaluation.adminevaluationController', ['evaluation','$scope','apiServices','toastr',function(evaluation,$scope,apiServices,toastr){


	$scope.evaluations = evaluation.data;

	var evaluations = apiServices.model('evaluacionteorica');
	$scope.totalItems = parseInt(evaluation.headers('x-pagination-total-count'));
	$scope.currentPage = 1;
	$scope.pageItems = 20;


	$scope.searchItems = function (params){

		if(params){
			 evaluations.params({nombre:params}).search().then(
			 	function (q){
			 		$scope.evaluations = q.data;
			 		$scope.totalItems = parseInt(q.headers('x-pagination-total-count'));
			 		console.log(q.headers());
					$scope.currentPage = 1;
					$scope.pageItems = 20;
			 	},
			 	function(q){
				switch(q.status){
				case 404:
						console.log("¡Error!");
				break;
					}
				}
			 	)
		}
		else{
				evaluations.get().then(
				function (q){
				$scope.evaluations = q.data;
				$scope.totalItems = parseInt(q.headers('x-pagination-total-count'));
				$scope.currentPage = 1;
				$scope.pageItems = 20;
							}
				)
		}
	};


	$scope.pageChanged = function(page,params) {


		if(params){
				evaluations.page(page-1).params({nombre:params}).search().then(
				function (q){
				$scope.evaluations = q.data;
				$scope.totalItems = parseInt(q.headers('x-pagination-total-count'));
				$scope.currentPage = page;
				$scope.pageItems = 20;
							}
				,function(q){
				if(q.status == 404){
				$scope.evaluations = {};
				$scope.totalItems = 0;
				$scope.currentPage = page;
				$scope.pageItems = 20;
				}
				}
				)		
		}
		else{
				evaluations.page(page).get().then(
				function (q){
				$scope.evaluations = q.data;
				$scope.totalItems = parseInt(q.headers('x-pagination-total-count'));
				$scope.currentPage = page;
				$scope.pageItems = 20;
							}
				)
		}

	};


	$scope.remove=function(key){
		apiServices.model('evaluacionteorica').remove($scope.evaluations[key].id).then(function(q) {
			$scope.evaluations.splice(key,1);
			toastr.success("Se ha eliminado con exito.","Exito");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}

}])