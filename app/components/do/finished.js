'use strict';
angular.module('do')
.controller('do.finishedCtrl', [
	'$scope',
	'$location',
	'toastr',
	'trabajadorStorage',
	'apiServices',
	'evaluacionStorage',
function(
	$scope,
	$location,
	toastr,
	trabajadorStorage,
	api,
	evaluacionStorage
	){

	var comentarioServices=api.model('fichacomentario');

	console.log(trabajadorStorage.q);
	$scope.finished=function(){
		if($scope.comentario){
			comentarioServices.save({fic_id:trabajadorStorage.q.id,comentario:$scope.comentario}).then(function(q){
			},function(q){
				console.log(q);

			})
		}
		trabajadorStorage.q=null;
		evaluacionStorage.eliminarEvaluacion();
		$location.path("/welcome");
	};

}])