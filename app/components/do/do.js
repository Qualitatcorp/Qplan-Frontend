"use strict";
/**
* do Module
*
* SPA para republica dominicana
*/
angular.module('do', [
	'ngRoute',
	'ngAnimate',
	'ngSanitize',
	'ApiRest',
	'toastr',
	'filters'
])
.config(['$routeProvider',function($routeProvider) {
	var Url={basePath:"views/",to:function(tpl){return this.basePath+tpl+".html";}};
	$routeProvider
	.when('/',{
		redirectTo:'/welcome'
	})
	.when('/welcome',{
		templateUrl:Url.to('do/welcome')
	})
	.when('/register',{
		templateUrl:Url.to('do/register'),
		controller:'do.registerCtrl'
	})
	.when('/evaluation',{
		templateUrl:Url.to('do/evaluation'),
		controller:'do.evaluationCtrl',
		resolve:{
			perfil:['apiServices','PER_ID',function(api,PER_ID){
				return api.model('perfil').expand('modteorica,pet,evateorica,preguntas,alternativas,recursos,rhs,sources,rho,options').get(PER_ID);
			}],
		}
	})
	.when('/finished',{
		templateUrl:Url.to('do/finished')
	})
	.when('/404',{
		template:'Error 404'
	})	
	.otherwise({
		redirectTo:'/404'
	});
}])
.value('OT',2)
.value('PER_ID',5);