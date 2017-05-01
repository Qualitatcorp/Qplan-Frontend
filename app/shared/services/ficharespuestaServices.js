/**
* ficharespuesta Module
*
* encargado de cargar las ficharespuesta es de api rest
*/
angular.module('ApiRest')
.service('ficharespuestaServices', ['WebApiConfig','$http','$httpParamSerializer', function(WebApiConfig,$http,$httpParamSerializer){
	return {		
		base:"ficharespuesta",
		primaryKey:"id",
		save:function(model){
			if(model[this.primaryKey])
				return $http.put([WebApiConfig.resourceUrl(this.base),model[this.primaryKey]].join('/'),model);
			else
				return $http.post(WebApiConfig.resourceUrl(this.base),model);
		},

		getAll:function(){
			return $http.get(WebApiConfig.resourceUrl(this.base));
		},
		search:function(params){
			console.log(WebApiConfig.resourceUrl(this.base)+'/search?'+$httpParamSerializer(params));
			return $http.get(WebApiConfig.resourceUrl(this.base)+'/search?'+$httpParamSerializer(params));
		},
		get:function(id){
			return $http.get([WebApiConfig.resourceUrl(this.base),id].join('/'));
		},
		remove:function(id){
			return $http.delete([WebApiConfig.resourceUrl(this.base),id].join('/'));
		}
	}
}])