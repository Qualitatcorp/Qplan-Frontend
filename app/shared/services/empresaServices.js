/**
* empresa Module
*
* encargado de cargar las empresas de api rest
*/
angular.module('ApiRest')
.factory('empresaServices', ['WebApiConfig','$http','$httpParamSerializer', function(WebApiConfig,$http,$httpParamSerializer){
	
	var primaryKey='id';
	return {
		save:function(model){
			if(model[primaryKey]){
				return $http.put([WebApiConfig.resourceUrl('empresa'),model[primaryKey]].join('/'),model);}
				else
					return $http.post(WebApiConfig.resourceUrl('empresa'),model);
			},
			getAll:function(){
				return $http.get(WebApiConfig.resourceUrl('empresa'));
			},
			search:function(params){
				return $http.get(WebApiConfig.resourceUrl('empresa')+'/search?'+$httpParamSerializer(params));
			},
			get:function(id){
				return $http.get([WebApiConfig.resourceUrl('empresa'),id].join('/'));
			},
			remove:function(id){
				return $http.delete([WebApiConfig.resourceUrl('empresa'),id].join('/'));
			}
		}
	}])