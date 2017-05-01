angular.module('ApiRest')
.factory('otServices', ['WebApiConfig','$http','$httpParamSerializer',
	function(WebApiConfig,$http,$httpParamSerializer){
		var base='ordentrabajo';
		var primaryKey='id';
		return {
			getAll:function(params){
				return (params)?$http.get(WebApiConfig.resourceUrl(base)+'?'+$httpParamSerializer(params)):$http.get(WebApiConfig.resourceUrl(base));
			},
			search:function(params){
				return $http.get(WebApiConfig.resourceUrl(base)+'/search?'+$httpParamSerializer(params));
			},
			save:function(model){
				return (model[primaryKey])?$http.put([WebApiConfig.resourceUrl(base),model[primaryKey]].join('/'),model):$http.post(WebApiConfig.resourceUrl(base),model);
			},
			get:function(id,params){
				return (params)?$http.get([WebApiConfig.resourceUrl(base),id].join('/')+'?'+$httpParamSerializer(params)):$http.get([WebApiConfig.resourceUrl(base),id].join('/'));
			},
			remove:function(id){
				return $http.delete([WebApiConfig.resourceUrl(base),id].join('/'));
			}
		}
	}
])