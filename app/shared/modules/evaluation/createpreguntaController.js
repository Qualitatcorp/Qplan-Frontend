angular.module('Evaluationmantenedor')

.controller('evaluation.createpreguntaController', ['FileUploader','WebApiConfig','$scope','$routeParams','apiServices','$location','toastr',
function(FileUploader,WebApiConfig,$scope,$routeParams,apiServices,$location,toastr){
	
	
	$scope.pregunta={};

	$scope.pregunta.eva_id = $routeParams.id;
	var evaluacionid = $routeParams.id;

	$scope.select={
		habilitado:["SI","NO"],
		level: ["BASICA","MEDIA","AVANZADA"],
		correcta: ["SI","NO"],
		fuentes: ["CONTENIDO","AUDIO-PREGUNTA","POSTER"]
	}

	$scope.alternativas = [];
	$scope.recursos = {};
	$scope.files = [];

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

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
    	console.log(response.id);
    	//lista de recursos
     	 	$scope.files.push({"src_id":response.id,"src":response.src,"title":response.title,"tipo":""});
           
        };

	uploader.onCompleteAll = function() {
	            console.info('onCompleteAll');
	        };


	$scope.remove = function(key){
			$scope.files.splice(key,1);		
	};

	 //       

	$scope.save=function() {

		apiServices.model('evaluacionpregunta').save($scope.pregunta).
		then(function(q){	 
			$scope.alternativas.forEach(function(elemento){
				elemento.pre_id = q.data.id;
				apiServices.model('evaluacionalternativa').save(elemento).then(function(m){
				console.log(m);
				})
			})
			$scope.recursos.pre_id=q.data.id;
			console.log($scope.files);
			apiServices.model('recursos').save($scope.recursos).then(function(j){
				$scope.files.forEach(function(fileitem){
				fileitem.rec_id = j.data.id;
				apiServices.model('recursoshassources').save(fileitem).then(function(m){
				})
			})		
			});
			toastr.success("Se ha creado la pregunta con éxito.","Exito");
			$location.path("evaluation/"+evaluacionid);
		}
		);
	}
}])

