/**
* Sucursal Module
*
* encargado de cargar las sucursales de api rest
*/
angular.module('ApiRest')
.factory('sucursalServices', ['WebApiConfig','$http','$httpParamSerializer', function(WebApiConfig,$http,$httpParamSerializer){
	return {
		getAll:function(){
			return $http.get(WebApiConfig.resourceUrl('empresasucursal'));
		},
		search:function(params){
					return $http.get(WebApiConfig.resourceUrl('empresasucursal')+'/search?'+$httpParamSerializer(params));
		},
		get:function(id){
			return $http.get([WebApiConfig.resourceUrl('empresasucursal'),id].join('/'));
		},
		remove:function(id){
			return $http.delete([WebApiConfig.resourceUrl('empresasucursal'),id].join('/'));
		}
	}
}])