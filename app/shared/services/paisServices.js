/**
* pais Module
*
* encargado de cargar los paises de api rest
*/
angular.module('ApiRest')
.factory('paisServices', ['WebApiConfig','$http','$httpParamSerializer', function(WebApiConfig,$http,$httpParamSerializer){
	return {
		getAll:function(){
			return $http.get(WebApiConfig.resourceUrl('pais'));
		},
		search:function(params){
			return $http.get(WebApiConfig.resourceUrl('pais')+'/search?'+$httpParamSerializer(params));
		},
		get:function(id){
			return $http.get([WebApiConfig.resourceUrl('pais'),id].join('/'));
		}

	}
}])