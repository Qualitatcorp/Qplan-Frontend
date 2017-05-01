/**
* test Module
*
* Description
*/
angular.module('test', ['ngRoute','ngAnimate','mgcrea.ngStrap'])
.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/admin',{
		templateUrl:'views/test/admin.html',
		controller:'adminController',
		resolve:{
			personas:['testServices',function(testServices){
				return testServices.get.All;
			}]
		}
	})
	.when('/edit/:id',{
		templateUrl:'views/test/edit.html',
		controller:'editController',
		resolve:{
			persona:['testServices','$route',function(testServices,$route){
				return testServices.get.One($route.current.params.id);
			}]
		}
	})
	.when('/create',{
		templateUrl:'views/test/create.html',
		controller:'createController'
	})
	.otherwise({redirectTo:'/admin'});
}])
.factory('ApiServices',function(){
	var api={		
		host:'http://localhost/Qplan-Backend/web',
		auth:'authentication',
		token:'token',
		version:'v1',
		client_id:'qplan-evaluacion',
		client_secret:'qualitat2016'
	}
	return {
		get hostUrl(){
			return [api.host,api.version].join('/');
		},
		get authenticationUrl(){
			return [api.host,api.auth,api.token].join('/');
		},
		resourceUrl(model){
			return [api.host,api.version,model].join('/');
		},
		get api(){
			return api;
		}
	}
})
.service('testServices', ['$http','ApiServices', function($http,ApiServices){
	var resource='test';
	this.get={
		get All(){
			return $http.get(ApiServices.resourceUrl(resource));
		},
		One(id){
			return $http.get([ApiServices.resourceUrl(resource),id].join('/'));
		},
	}
	this.save = function(model){
		if(model.id){
			console.log("Actualiza");
			return $http.put([ApiServices.resourceUrl(resource),model.id].join('/'),model);
		}
		console.log("Crear");
		return $http.post([ApiServices.resourceUrl(resource)].join('/'),model);
	}
	this.delete=function(model) {
		if(angular.isNumber(model))
			return $http.delete([ApiServices.resourceUrl(resource),model].join('/'))
		else{
			return $http.delete([ApiServices.resourceUrl(resource),model.id].join('/'))
		}
	}
}])
.controller('adminController', ['$scope','personas','testServices', function($scope,personas,testServices){
	$scope.personas=personas.data;
	$scope.delete=function(index) {
		testServices.delete($scope.personas[index])
		.then(function(q){
			$scope.personas.splice(index,1);
			console.log(q)

			// testServices.get.All.then(
			// 	function(q) {
			// 		console.log(q);
			// 		$scope.personas=q.data
			// 	},
			// 	function(q) {
			// 		console.warn(q);
			// 	}
			// )
		},
		function(q) {
			console.warn(q)
		})


	};
}])
.controller('editController', ['$scope','persona','testServices','$location', function($scope,persona,testServices,$location){
	$scope.persona=persona.data;
	$scope.persona.estatura=parseFloat($scope.persona.estatura);
	$scope.guardar=function(){
		testServices.save($scope.persona)
		.then(
			function(q) {
				console.log(q);
				$location.path("!#/admin");
			},
			function error(q) {
				console.warn(q);
			}
			);
	};
}])
.controller('createController', ['$scope','testServices','$location', function($scope,testServices,$location){
	$scope.persona={}
	$scope.guardar=function() {
		testServices.save($scope.persona).
		then(function(q){
			console.log(q);
			$location.path("!#/admin");
		},
		function(q) {
			console.warn(q);
		});
	}
}])