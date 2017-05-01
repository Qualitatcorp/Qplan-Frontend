angular.module('ApiRest')
.factory('userServices', ['WebApiConfig','$http','$httpParamSerializer','sessionServices',
	function(WebApiConfig,$http,$httpParamSerializer,session){
		var base='user';
		var primaryKey='id';
		if(!session.expire){
			$http.defaults.headers.common.Authorization="Bearer "+session.token;
		}else{
			console.log("expiro la session");
		}
		return {
			getAll:function(){
				return $http.get(WebApiConfig.resourceUrl(base));
			},
			search:function(params){
				return $http.get(WebApiConfig.resourceUrl(base)+'/search?'+$httpParamSerializer(params));
			},
			save:function(model){
				if(model[primaryKey])
					return $http.put([WebApiConfig.resourceUrl(base),model[primaryKey]].join('/'),model);
				else
					return $http.post(WebApiConfig.resourceUrl(base),model);
			},
			get:function(id,params){
				if(params){
					return $http.get([WebApiConfig.resourceUrl(base),id].join('/')+'?'+$httpParamSerializer(params));
				}else{
					return $http.get([WebApiConfig.resourceUrl(base),id].join('/'));
				}
			},
			remove:function(id){
				return $http.delete([WebApiConfig.resourceUrl(base),id].join('/'));
			}
		}
	}
])