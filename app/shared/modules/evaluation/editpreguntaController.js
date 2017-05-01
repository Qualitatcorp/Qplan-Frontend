angular.module('Evaluationmantenedor')

.controller('evaluation.editpreguntaController', ['$scope','pregunta','apiServices','$location', function($scope,pregunta,apiServices,$location){
	

	$scope.pregunta=pregunta.data;
	$scope.pregunta.eva_id=pregunta.data.eva_id;
	$scope.alternativas=pregunta.data.alternativas;
	var cantalt=pregunta.data.alternativas.length;

	$scope.select={
		habilitado:["SI","NO"],
		level: ['BASICA','MEDIA','AVANZADA'],
		correcta: ["SI","NO"]
	}

	$scope.addNewChoice = function() {		
		$scope.alternativas.push({});
	};
	
	$scope.removeChoice = function() {
		var lastItem = $scope.alternativas.length-1;
		if($scope.alternativas[lastItem].id){
		apiServices.model('evaluacionalternativa').remove($scope.alternativas[lastItem].id);
		}
		$scope.alternativas.splice(lastItem);		
	};

	$scope.save=function() {
	apiServices.model('evaluacionpregunta').save($scope.pregunta).
	then(function(q){
		console.log($scope.alternativas.length);
			var cantalt2 = $scope.alternativas.length;
			$scope.alternativas.forEach(function(elemento){
				elemento.pre_id = q.data.id;
				apiServices.model('evaluacionalternativa').save(elemento).then(
					function success(q){
						
					});
			});
			$location.path("evaluation/"+$scope.pregunta.eva_id);
		},
		function(q) {
			console.warn(q);
		});
	}
}])
