/**
* cargo Module
*
* encargado de cargar los paises de api rest
*/
angular.module('ApiRest')
.factory('cargoServices', ['WebApiConfig','$http','$httpParamSerializer', function(WebApiConfig,$http,$httpParamSerializer){
	return {
		getAll(){
			return $http.get(WebApiConfig.resourceUrl('especialidadcargo'));
		},
		search(params){
			return $http.get(WebApiConfig.resourceUrl('especialidadcargo')+'/search?'+$httpParamSerializer(params));
		}
	}
}])