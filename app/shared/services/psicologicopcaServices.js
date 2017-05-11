angular.module('ApiRest')
.factory('psicologicopcaServices', ['WebApiConfig','$http','$httpParamSerializer','sessionServices', function(WebApiConfig,$http,$httpParamSerializer,sessionServices){
	return { 
		send: function(data){
                    return $http.post(WebApiConfig.resourceUrl('psicologicopca'),data);
                  }
        ,
		credential:function() {
				if(!sessionServices.expire){$http.defaults.headers.common.Authorization="Bearer "+sessionServices.token;}else{delete $http.defaults.headers.common.Authorization;}
		}
		
	 
	}
}])

 