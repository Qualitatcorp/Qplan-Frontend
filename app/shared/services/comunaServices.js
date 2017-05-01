/**
* comuna Module
*
* encargado de cargar los paises de api rest
*/
angular.module('ApiRest')
.factory('comunaServices', ['WebApiConfig','$http','$httpParamSerializer', function(WebApiConfig,$http,$httpParamSerializer){
	return {
		getAll:function(){
			return $http.get(WebApiConfig.resourceUrl('comuna'));
		},
		search:function(params){
			return $http.get(WebApiConfig.resourceUrl('comuna')+'/search?'+$httpParamSerializer(params));
		},
		get:function(id){
			return $http.get([WebApiConfig.resourceUrl('comuna'),id].join('/'));
		}

	}
}])