/**
* trabajador Module
*
* Termino del sistema
*/
angular.module('trabajador')
.controller('psicologicoPcaController', ['$scope','$sce','$location','$timeout','toastr', function($scope,$sce,$location,$timeout,toastr){
    $scope.url = $sce.trustAsResourceUrl('https://timshr.com/pruebapca//default.aspx?codigo=276bb6d9-a531-46cc-b851-db7fa6567c44&correo=&lang=es-cl&pS=0&inv=1&uD=0&iFrm=1');
}])