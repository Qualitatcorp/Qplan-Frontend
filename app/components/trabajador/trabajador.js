"use strict"
/**
* trabajador Module
*
* Modulo de evaluacion del trabajador
*/
angular.module('trabajador', [
'ngRoute',
'ngAnimate',
'mgcrea.ngStrap',
'ApiRest',
'rut',
'toastr',
'filters',
'vjs.video',
'ngSanitize'])

.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider) {
	$routeProvider
	.when('/',{
		templateUrl:'views/trabajador/welcome.html'
	})
	.when('/login',{
		templateUrl:'views/trabajador/login.html',
		controller:'loginController'
	})
	.when('/antecendentes',{
		templateUrl:'views/trabajador/antecendentes.html',
		controller:'antecendentesController'
	})
	.when('/introduccion',{
		templateUrl:'views/trabajador/introduccion.html'
	})
	.when('/experiencia',{
		controller: "experienciaController",
		templateUrl: "views/trabajador/experiencia.html",
	})
	.when('/introduccion',{
		templateUrl:'views/trabajador/introduccion.html'
	})
	.when('/evaluacion',{
		templateUrl:'views/trabajador/evaluacion.html',
		controller:'evaluacionController',
		resolve:{
			evaluacion:['apiServices','trabajadorStorage',function(api,trabajadorStorage){
				return api.model('perfil').expand('modteorica,pet,evateorica,preguntas,alternativas,recursos,rhs,sources,rho,options').get(trabajadorStorage.q.ot.per_id);
			}],
		}
	})
	.when('/config',{
		templateUrl:'views/trabajador/config.html',
		controller:'configController'
	})	
	.when('/termino',{
		templateUrl:'views/trabajador/termino.html',
		controller: "terminoController",
		resolve:{
			fichas:['apiServices','trabajadorStorage',function(api,trabajadorStorage){
				return api.model('ficha').params({"tra_id":trabajadorStorage.q.id,"ot_id":trabajadorStorage.q.ot.id}).search();
			}],
		}
	})	
	.when('/404',{
		template:'Error 404 :)'
	})
	.otherwise({
		redirectTo:'/404'
	});
}])