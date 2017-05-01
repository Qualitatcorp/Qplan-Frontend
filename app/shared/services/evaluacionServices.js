angular.module("ApiRest")
.service('evaluacionServices',  ['WebApiConfig','$http','$httpParamSerializer', function(WebApiConfig,$http,$httpParamSerializer){
	return {
		getAll:function(){
			console.log($http.get(WebApiConfig.resourceUrl('perfil')));
			return $http.get(WebApiConfig.resourceUrl('perfil'));
		},
		search:function(params){
			console.log(WebApiConfig.resourceUrl('perfil')+'/search?'+$httpParamSerializer(params));
			return $http.get(WebApiConfig.resourceUrl('perfil')+'/search?'+$httpParamSerializer(params));
		},
		get:function(id,params){
			if(params)
			 	return $http.get([WebApiConfig.resourceUrl('perfil'),id].join('/')+'?'+$httpParamSerializer(params));
			return $http.get([WebApiConfig.resourceUrl('perfil'),id].join('/'));
		},
		remove:function(id){
			return $http.delete([WebApiConfig.resourceUrl('perfil'),id].join('/'));
		}
	}
}])