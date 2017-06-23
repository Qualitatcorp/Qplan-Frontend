angular.module('filters').filter('dinamicSource',[function () {
	return function(input) {
		input=input||'';
		if(localStorage.resource_endpoint)
				return localStorage.resource_endpoint+input;
		return '/'+input;
	}
}]);