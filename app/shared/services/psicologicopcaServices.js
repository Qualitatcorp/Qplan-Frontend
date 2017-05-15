angular.module('ApiRest')
.factory('psicologicopcaServices', ['WebApiConfig','$http','$httpParamSerializer','sessionServices', function(WebApiConfig,$http,$httpParamSerializer,sessionServices){
	return { 
		inscripcion: function(data){
                    return $http.post(WebApiConfig.resourceUrl('psicologicopca'),data);
                  }
        ,
        gotosurvey: function(data){
                    return $http.post(WebApiConfig.resourceUrl('psicologicopca/gotosurvey'),data);
                  }
		,
        getresult : function(data){
                    return $http.post(WebApiConfig.resourceUrl('psicologicopca/getresult'),data);
                  }
        ,

		credential:function() {
				if(!sessionServices.expire){$http.defaults.headers.common.Authorization="Bearer "+sessionServices.token;}else{delete $http.defaults.headers.common.Authorization;}
		}
		
	 
	}
}])

 