/**
* trabajador Module
*
* Termino del sistema
*/
angular.module('trabajador')
.controller('psicologicoPcaController', ['$scope','$sce','$location','$timeout','toastr','psicologicopcaServices','trabajadorStorage', function($scope,$sce,$location,$timeout,toastr,psicologicopcaServices,trabajadorStorage){
   // $scope.url = $sce.trustAsResourceUrl('https://timshr.com/pruebapca//default.aspx?codigo=276bb6d9-a531-46cc-b851-db7fa6567c44&correo=&lang=es-cl&pS=0&inv=1&uD=0&iFrm=1');
   $scope.trabajador=trabajadorStorage.q;
   var inscripcion = 
   { 
    rut:$scope.trabajador.rut,
    sexo:$scope.trabajador.sexo,
    mail:$scope.trabajador.mail,
    nombre:$scope.trabajador.nombre,
    paterno:$scope.trabajador.paterno,
    materno:$scope.trabajador.materno,
    ficha:$scope.trabajador.ficha.id
    }
    p = psicologicopcaServices.send(inscripcion);
    p.then(function(request) {
        $scope.url = $sce.trustAsResourceUrl(request.data.AddSurveyResult._x003C_PcaLink_x003E_k__BackingField);
        console.log(request.data.AddSurveyResult);
    }, function(request) {
       console.warn(request.data);
    });
    $scope.termino = function() {
          console.warn('request.data');
    };
}])