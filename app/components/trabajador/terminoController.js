/**
* trabajador Module
*
* Termino del sistema
*/
angular.module('trabajador')
 .controller('terminoController', ['psicologicopcaServices','$scope','trabajadorStorage','$sce','$location','$timeout','toastr', function(psicologicopcaServices,$scope,trabajadorStorage,$sce,$location,$timeout,toastr){
  	// toastr.info('Pronto volvera al comienzo favor acercarse a la mesa', 'Información');
	// $timeout(function() {
	// 	$location.path('/');
	

    //console.log($scope.ficha);
    $scope.url = $sce.trustAsResourceUrl('http://tma.timshr.com/pca/f9e91068-912c-4303-82a3-5ae344332622/8');
        
    $scope.changeIt = function () {
        $scope.url = $sce.trustAsResourceUrl('https://docs.angularjs.org/tutorial');
    }
     
    
    $scope.trabajador=trabajadorStorage.q;
    //console.log($scope.trabajador);
    var pca = { trabajador: $scope.trabajador, ficha :$scope.ficha}
    p = psicologicopcaServices.send(pca );
    p.then(function(request) {
      console.log(request);
    }, function(request) {
       console.warn(request);
    });

}])

// angular.module('trabajador')
// .controller('terminoController', ['apiServices','$scope','ficha','trabajadorStorage','$sce','$location','$timeout','toastr', function(apiServices,$scope,ficha,trabajadorStorage,$sce,$location,$timeout,toastr){
//     // toastr.info('Pronto volvera al comienzo favor acercarse a la mesa', 'Información');
//     // $timeout(function() {
//     //  $location.path('/');
//     // },10000)
//     $scope.ficha=ficha.data[0];
//     console.log("hola");
//     console.log($scope.ficha);
//     $scope.url = $sce.trustAsResourceUrl('http://tma.timshr.com/pca/f9e91068-912c-4303-82a3-5ae344332622/8');
        
//     $scope.changeIt = function () {
//         $scope.url = $sce.trustAsResourceUrl('https://docs.angularjs.org/tutorial');
//     }


//     $scope.trabajador=trabajadorStorage.q;
//     console.log($scope.trabajador);
//     var evatip = {nombre:'nombre'}
//     var eva = apiServices.model("evaluaciontipo");
//     eva.save(evatip).then(
//             function success(request){
//                 console.log(request)
//             },function error(request) {
//                 console.warn(request)                
//             }
//         );


// }])