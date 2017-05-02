angular.module('filters').filter('dinamicSource',[function () {
	return function(input, params) {
		input=input||'';
		if(localStorage.resource_endpoint)
				return localStorage.resource_endpoint+input;

		return input+params;
	}}]
	)