angular.module('Perfil')

.controller('perfil.viewperfilController', ['toastr','apiServices','$scope','perfil','$location','$http','reportServices', function(toastr,apiServices,$scope,perfil,$location,$http,reportServices){
	console.log();
	$scope.perfil=perfil.data;
	$scope.pdf="";
	reportServices.init('ot','listado').get(1).then(function(q) {
		console.log(q);
		$scope.pdf=
		q.document.src;
		q.document.url;
		q.document.file;
		q.document.saveAs("hola.pdf");
		q.document.open();
	});
	$scope.remove=function(id){
		apiServices.model('perfil').remove(id).then(function(q) {
			toastr.success("Se ha eliminado con exito.","Exito");
			$location.path("perfil/admin");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}

}])