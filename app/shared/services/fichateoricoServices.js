/**
* fichateorico Module
*
* encargado de cargar las fichateorico es de api rest
*/
angular.module('ApiRest')
.service('fichateoricoServices', ['WebApiConfig','$http','$httpParamSerializer', function(WebApiConfig,$http,$httpParamSerializer){
	return {		
		base:"fichateorico",
		primaryKey:"id",
		save:function(model){
			if(model[this.primaryKey])
				return $http.put([WebApiConfig.resourceUrl(this.base),model[this.primaryKey]].join('/'),model);
			else
				return $http.post(WebApiConfig.resourceUrl(this.base),model);
		},
		get:function(id){
			return $http.get([WebApiConfig.resourceUrl(this.base),id].join('/'));
		},
		getAll:function(){
			return $http.get(WebApiConfig.resourceUrl(this.base));
		},
		search:function(params){
			return $http.get(WebApiConfig.resourceUrl(this.base)+'/search?'+$httpParamSerializer(params));
		},
		remove:function(id){
			return $http.delete([WebApiConfig.resourceUrl(this.base),id].join('/'));
		}
	}
}])