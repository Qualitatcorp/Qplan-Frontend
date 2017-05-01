/**
* Especialidad Module
*
* encargado de cargar las especialidades de api rest
*/
angular.module('ApiRest')
.factory('especialidadServices', ['WebApiConfig','$http','$httpParamSerializer', function(WebApiConfig,$http,$httpParamSerializer){
	return {
		getAll:function(){
			console.log($http.get(WebApiConfig.resourceUrl('especialidad')));
			return $http.get(WebApiConfig.resourceUrl('especialidad'));
		},
		search:function(params){
			console.log(WebApiConfig.resourceUrl('especialidad')+'/search?'+$httpParamSerializer(params));
			return $http.get(WebApiConfig.resourceUrl('especialidad')+'/search?'+$httpParamSerializer(params));
		},
		get:function(id){
			return $http.get([WebApiConfig.resourceUrl('especialidad'),id].join('/'));
		},
		remove:function(id){
			return $http.delete([WebApiConfig.resourceUrl('especialidad'),id].join('/'));
		}
	}
}])