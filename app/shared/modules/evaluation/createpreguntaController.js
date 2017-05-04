angular.module('Evaluationmantenedor')

.controller('evaluation.createpreguntaController', ['FileUploader','WebApiConfig','$scope','$routeParams','apiServices','$location','toastr',function(FileUploader,WebApiConfig,$scope,$routeParams,apiServices,auth,$location,toastr){
	
	
	$scope.pregunta={};

	$scope.pregunta.eva_id = $routeParams.id;

	$scope.select={
		habilitado:["SI","NO"],
		level: ["BASICA","MEDIA","AVANZADA"],
		correcta: ["SI","NO"]
	}

	$scope.alternativas = [];

	$scope.recursos = {};

	$scope.recursoshas = {};

	$scope.files = [
 		{type: "image/png", src: "click5", title :"prop2"},
  		{type: "image/png", src: "click6", title :"prop3"}
	];

	$scope.addNewChoice = function() {		
		$scope.alternativas.push({});
	};
	
	$scope.removeChoice = function() {
		var lastItem = $scope.alternativas.length-1;
		$scope.alternativas.splice(lastItem);
	};
	
	//SUBIR ARCHIVOS
    
    var uploader = $scope.uploader = new FileUploader({
    	   headers:{ "Authorization": "Bearer " + sessionStorage.access_token },
           url: WebApiConfig.resourceUrl("recursossources"),
           autoUpload :true,
          });

        // FILTERS
      
        // a sync filter
    uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
               /* console.log('syncFilter');
*/                return this.queue.length < 10;
            }
        });
      
        // an async filter
    uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
              /*  console.log('asyncFilter');*/
                setTimeout(deferred.resolve, 1e3);
            }
        });


	//GUARDAR

	$scope.save=function() {

		apiServices.model('evaluacionpregunta').save($scope.pregunta).
		then(function(q){
			
			$scope.recursos.pre_id = q.data.id;
			apiServices.model('recursos').save($scope.recursos).then(
				function(q){					
				});

			$scope.files.forEach(function(elemento){
				apiServices.model('recursossources').save(elemento).then(
				function(q){
					console.log(q);
				}
			)
			});


			/*apiServices.model('recursoshassources').save();*/


			$scope.alternativas.forEach(function(elemento){
				elemento.pre_id = q.data.id;
				apiServices.model('evaluacionalternativa').save(elemento).then(
					function success(q){
					});
			})
			toastr.success("La pregunta se ha creado con exito.","Exito");
			$location.path("evaluation/"+$routeParams.id);
		}
		);
	}
}])

