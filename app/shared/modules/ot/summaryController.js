/**
* user Module
*
* modulo para user
*/
angular.module('Ot')
.controller('ot.summaryController', ['$scope','toastr','$timeout','ot','$uibModal',function($scope,toastr,$timeout,ot,$uibModal){
	ot.data.trabajador
	console.log(ot.data);
	$scope.model=ot.data;
	$scope.addPractica=function(key) {
		$uibModal.open({
			animation: true,
			templateUrl: 'views/practica/modal.html',
			size: 'md',
			controller:['$scope','sessionServices','authenticationServices','$uibModalInstance','toastr',"$route",'ficha',
				function($scope,session,auth,modal,toastr,$route,ficha) {
					console.log(ficha);
					// $scope.save=function(){
					// 	console.log($scope.practica);
					// 	// modal.close();
					// 	$route.reload();
					// }
				}
			],
			resolve:{
				ficha:ot.data
			}
		});
	}
}])