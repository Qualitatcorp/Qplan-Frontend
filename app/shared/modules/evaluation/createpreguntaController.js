angular.module('Evaluationmantenedor')

.controller('evaluation.createpreguntaController', ['uiUploader','$log','$scope','$routeParams','apiServices','$location','toastr',
	function(uiUploader,$log,$scope,$routeParams,apiServices,$location,toastr){
	
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

	$scope.btn_remove = function(file) {
                    uiUploader.removeFile(file);
                };

    $scope.btn_clean = function() {
                    uiUploader.removeAll();
                };

    $scope.btn_upload = function() {
                    uiUploader.startUpload({
                      /*  url: 'http://localhost/Qplan-Backend/web/formupload/upload',*/
                        url: 'https://posttestserver.com/post.php',
                        concurrency: 2,
                        onProgress: function(file) {
                            $log.info(file.name + '=' + file.humanSize);
                            $scope.$apply();
                        },
                        onCompleted: function(file, response) {
                            $log.info(file + 'response' + response);
                        }
                    });
                };

    $scope.files = [];

    $scope.createfiles = function(){

    	  var element = document.getElementById('file1');          
                	element.addEventListener('change', function(e) {
                    var files = e.target.files;
                    uiUploader.addFiles(files);
                    $scope.files = uiUploader.getFiles();
                    $scope.$apply();
                });
                

    }; 

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

