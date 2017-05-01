/**
* empresa Module
*
* encargado de cargar las empresas de api rest
*/
angular.module('ApiRest')
.factory('experienciaServices', ['WebApiConfig','$http','$httpParamSerializer', function(WebApiConfig,$http,$httpParamSerializer){
	
	var primaryKey='id';
	return {
		save:function(model){
			if(model[primaryKey]){
				return $http.put([WebApiConfig.resourceUrl('trabajadorexperiencia'),model[primaryKey]].join('/'),model);}
				else
					return $http.post(WebApiConfig.resourceUrl('trabajadorexperiencia'),model);
			},
			getAll:function(){
				return $http.get(WebApiConfig.resourceUrl('trabajadorexperiencia'));
			},
			search:function(params){
				return $http.get(WebApiConfig.resourceUrl('trabajadorexperiencia')+'/search?'+$httpParamSerializer(params));
			},
			get:function(id){
				return $http.get([WebApiConfig.resourceUrl('trabajadorexperiencia'),id].join('/'));
			},
			remove:function(id){
				return $http.delete([WebApiConfig.resourceUrl('trabajadorexperiencia'),id].join('/'));
			}
		}
	}])