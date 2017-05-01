/**
* ApiRest Module
*/
angular.module('ApiRest').factory('authInterceptor', ['$q','sessionServices', function($q,session){
	return {
        request: function(config) {
            config.headers = config.headers || {};
            if (!session.expire) {
            	console.log("Etro a interceotar");
				console.log(config);
                config.headers.Authorization = 'Bearer ' + session.token;
            }
            return config || $q.when(config);
        },
        response: function(response) {
            if (response.status === 401) {
            	console.log(response);
            }
            return response || $q.when(response);
        }
	}
}])