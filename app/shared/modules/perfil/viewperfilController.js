angular.module('Perfil')

.controller('perfil.viewperfilController', ['toastr','apiServices','$scope','perfil','$location','$http','$window','FileSaver', function(toastr,apiServices,$scope,perfil,$location,$http,$window,FileSaver){
	
	$scope.perfil=perfil.data;
	$scope.pdf;
	$http.get("http://localhost/Qplan-Frontend/Doc/asdPractica.pdf",{responseType: 'arraybuffer'}).then(function(q) {
		var file = new Blob([q.data],{type:'application/pdf'});
		// console.log(file);
		var fileURL = URL.createObjectURL(file);
		$scope.pdf=fileURL;
		// console.log(fileURL);
		// console.log(q);
		// $window.open(fileURL);
		// FileSaver.saveAs(file, 'ficha.pdf');
	})
	$scope.remove=function(id){
		apiServices.model('perfil').remove(id).then(function(q) {
			toastr.success("Se ha eliminado con exito.","Exito");
			$location.path("perfil/admin");
		},function(q) {
			toastr.error("Codigo : "+q.status,"Error");
		})
	}

}])