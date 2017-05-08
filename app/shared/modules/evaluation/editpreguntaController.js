angular.module('Evaluationmantenedor')

.controller('evaluation.editpreguntaController', ['toastr','FileUploader','WebApiConfig','$scope','pregunta','apiServices','$location', function(toastr,FileUploader,WebApiConfig,$scope,pregunta,apiServices,$location){
	

	$scope.pregunta=pregunta.data;
	$scope.pregunta.eva_id=pregunta.data.eva_id;
	$scope.alternativas=pregunta.data.alternativas;
	var cantalt=pregunta.data.alternativas.length;
	$scope.recursos = pregunta.data.recursos;
	$scope.sources = pregunta.data.sources;
	$scope.files = pregunta.data.rhs;

	for (var i = 0, len = $scope.files.length; i < len; i++) {
  		for (var j = 0, leng = $scope.sources.length; j < leng; j++) {
  			if ($scope.sources[j].id == $scope.files[i].src_id) {
  				$scope.files[i].title = $scope.sources[j].title;
  				$scope.files[i].src = $scope.sources[j].src;
  			}
		}
	}

	$scope.select={
		habilitado:["SI","NO"],
		level: ["BASICA","MEDIA","AVANZADA"],
		correcta: ["SI","NO"],
		fuentes: ["CONTENIDO","AUDIO-PREGUNTA","POSTER"]
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
    	//lista de recursos

    		var file = {"src_id":response.data.id,"src":response.data.src,"title":response.data.title,"tipo":""};

			file.rec_id = $scope.recursos.id;
			apiServices.model('recursoshassources').save(file).then(function(m){
				var f = m.data;
				f.src = response.data.src;
				f.title = response.data.title;
				$scope.files.push(f);
			});

        };

	uploader.onCompleteAll = function() {
	            console.info('onCompleteAll');
	        };


	$scope.remove = function(key){
			apiServices.model('recursoshassources').remove($scope.files[key].id).then(function(q) {
				$scope.files.splice(key,1);
				toastr.success("Se ha eliminado con exito.","Exito");
			},function(q) {
				toastr.error("Codigo : "+q.status,"Error");
			})	
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
			/*$scope.recursos.pre_id=q.data.id;*/
			apiServices.model('recursos').save($scope.recursos).then(function(j){
				$scope.files.forEach(function(fileitem){
				fileitem.rec_id = j.data.id;
				apiServices.model('recursoshassources').save(fileitem).then(function(m){
				})
			})		
			});
			$scope.recursos.pre_id=q.data.id;
			apiServices.model('recursos').save($scope.recursos).then(function(j){		
			});
			toastr.success("Se ha creado la pregunta con éxito.","Exito");
			window.history.back();
		}
		);
	}
}])
