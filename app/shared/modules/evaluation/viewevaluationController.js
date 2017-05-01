angular.module('Evaluationmantenedor')

.controller('evaluation.viewevaluationController', ['$scope','toastr','evaluation','apiServices','$location', 
	function($scope,toastr,evaluation,apiServices,$location){
		
		$scope.evaluation=evaluation.data;

		apiServices.model('evaluaciontipo').get($scope.evaluation.tev_id).then(
			function(q) {
				$scope.interface.tipo=q.data;
			}
			);


		$scope.interface={

			set tipo(value){
				$scope.evaluation.tipo=value;
				if(angular.isObject($scope.evaluation.tipo)){
					$scope.evaluation.tev_id=$scope.evaluation.tipo.id;
				}
			},
			get tipo(){
				if(angular.isObject($scope.evaluation.tipo))
					return $scope.evaluation.tipo.nombre;
				return $scope.evaluation.tipo;
			}
		}


		$scope.getTipos=function(texto){
			return apiServices.model('evaluaciontipo').search({nombre:texto}).then(
				function(promise){
					return promise.data;
				}
				);
		}


		$scope.remove=function(key){
			apiServices.model('evaluacionpregunta').remove($scope.evaluation.preguntas[key].id).then(function(q) {
				$scope.evaluation.preguntas.splice(key,1);
				toastr.success("Se ha eliminado con exito.","Exito");
			},function(q) {
				toastr.error("Codigo : "+q.status,"Error");
			})
		}




	}])