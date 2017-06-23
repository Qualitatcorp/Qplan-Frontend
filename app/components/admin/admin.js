"use strict";
/**
* admin Module
*
* Destinado a la mantenibilidad del sistema
*/
angular.module('admin', [
	'ui.bootstrap',
	'ngRoute',
	'ngAnimate',
	'ngSanitize',
	'ngFileSaver',
	'ui.bootstrap',
	'toastr',
	'ApiRest',
	'User',
	'Ot',
	'Empresa',
	'Worker',
	'Evaluationmantenedor',
	'Perfil',
	'filters',
	'ui.uploader',
	'angularFileUpload',
	'ui.select'
	])

.config(['$routeProvider','uiSelectConfig',function($routeProvider,uiSelectConfig) {
  uiSelectConfig.theme = 'bootstrap';
	var Url={basePath:"views/",to:function(tpl){return this.basePath+tpl+".html";}};
	$routeProvider
	.when('/',{
		redirectTo:'/login'
	})
	.when('/login',{
		templateUrl:Url.to("login/form"),
		controller:"loginController",
	})
	// Pantalla De Inicio
	.when('/inicio',{
		templateUrl:Url.to("admin/inicio"),
		// controller:"inicioController",
	})
	//	Usuarios
	.when('/users/create',{
		templateUrl:Url.to("users/create"),
		controller:"user.createController",
	})
	.when('/users/update/:id',{
		templateUrl:Url.to("users/update"),
		controller:"user.updateController",
		resolve:{
			model:['apiServices','$route',function(apiServices,$route){
				return apiServices.model('user').get($route.current.params.id);
			}]
		}
	})
	.when('/users/view/:id',{
		templateUrl:Url.to("users/view"),
		controller:"user.viewController",
		resolve:{
			model:['apiServices','$route',function(apiServices,$route){
				return apiServices.model('user').get($route.current.params.id);
			}]
		}
	})
	.when('/users/admin',{
		templateUrl:Url.to("users/admin"),
		controller:"user.adminController",
		resolve:{
			users:['apiServices','$route',function(apiServices){
				return apiServices.model('user').get();
			}]
		}
	})
	.when('/users/role',{
		templateUrl:Url.to("users/admin"),
		controller:"user.adminController",
		resolve:{
			users:['apiServices','$route',function(apiServices){
				return apiServices.model('user').get();
			}]
		}
	})
	.when('/users/resource',{
		templateUrl:Url.to("users/resource/admin"),
		controller:"resource.adminController",
		resolve:{
			models:['apiServices','$route',function(apiServices){
				return apiServices.model('userresource').expand('children').get(1);
			}]
		}
	})
	.when('/users/authentication',{
		templateUrl:Url.to("users/authentication/list"),
		controller:"authentication.adminCtrl",
		resolve:{
			models:['apiServices',function(apiServices){
				return apiServices.model('userauthentication').expand('user,client').sort('-expire').get();
			}]
		}
	})
	//Orden de trabajo
	.when('/ot/create',{
		templateUrl:Url.to("ot/create"),
		controller:"ot.createController",
	})
	.when('/ot/update/:id',{
		templateUrl:Url.to("ot/update"),
		controller:"ot.updateController",
		resolve:{
			model:['otervices','$route',function(otervices,$route){
				return otervices.get($route.current.params.id);
			}]
		}
	})
	.when('/ot/admin',{
		templateUrl:Url.to("ot/admin"),
		controller:"ot.adminController",
		resolve:{
			list:['apiServices',function(api){
				return api.model("ordentrabajo").expand("solicitud,usuario,empresa,especialidad,perfil,mandante,countfic,counttra").fields("id,inicio,estado").getAll();
			}],
		}
	})
	.when('/ot/:id/add',{
		templateUrl:Url.to("ot/createTrabajador"),
		controller:"ot.createTrabajadorController"
	})
	.when('/ot/:id/fichas',{
		template:"Muestra la fichas"
	})
	
	.when('/ot/:id/summary',{
		templateUrl:Url.to("ot/summary"),
		controller:"ot.summaryController",
		resolve:{
			ot:['apiServices','$route',function(api,$route){
				return api.model('ordentrabajo').expand("solicitud,trabajador,empresa,mandante,usuario,perfil,fichanotas,modulos"/*,modpractica,modtercero,modprimario"*/).get($route.current.params.id);
			}],
		}
	})
	.when('/ot/:id',{
		templateUrl:Url.to("ot/view"),
		controller:"ot.viewController",
		resolve:{
			ot:['apiServices','$route',function(api,$route){
				return api.model('ordentrabajo').expand("solicitud,trabajador,empresa,mandante,usuario,perfil").get($route.current.params.id);
			}]
		}

	})	
	//Empresa
	.when('/empresa',{
		templateUrl:Url.to("empresa/admin"),
		controller:"empresa.adminController",
		resolve:{
			empresas:['apiServices',function(apiServices){
				return apiServices.model('empresa').getAll();
			}]
		}

	})
	.when('/empresa/create',{
		templateUrl:Url.to("empresa/create"),
		controller:"empresa.createController",
	})
	.when('/empresa/edit/:id',{
		templateUrl:Url.to("empresa/edit"),
		controller:'empresa.editController',
		resolve:{
			empresa:['apiServices','$route',function(apiServices,$route){
				return apiServices.model('empresa').get($route.current.params.id);
			}]
		}
	})
	.when('/empresa/:id',{
		templateUrl:Url.to("empresa/view"),
		controller:'empresa.viewController',
		resolve:{
			empresa:['apiServices','$route',function(apiServices,$route){
				return apiServices.model('empresa').expand("pais,comuna").get($route.current.params.id);
			}]
		}
	})

	.when('/empresa/createclasificacion/:id',{
		templateUrl:Url.to("empresa/createclasificacion"),
		controller:'empresa.createclasificacionController',
		resolve:{
			empresa:['apiServices','$route',function(apiServices,$route){
				return apiServices.model('empresa').get($route.current.params.id);
			}]
		}
	})

	//Trabajador
	.when('/worker/admin',{
		templateUrl:Url.to("trabajador/mantenedor/admin"),
		controller:"worker.adminController",

		resolve:{
			workers:['apiServices',function(apiServices){
				return apiServices.model('trabajador').getAll();
			}]
			}


	})
	.when('/worker/create',{
		templateUrl:Url.to("trabajador/mantenedor/create"),
		controller:"worker.createController",
	})
	.when('/worker/edit/:id',{
		templateUrl:Url.to("trabajador/mantenedor/edit"),
		controller:'worker.editController',
		resolve:{
			worker:['apiServices','$route',function(apiServices,$route){
				return apiServices.model('trabajador').get($route.current.params.id);
			}]
		}
	})
	.when('/worker/:id',{
		templateUrl:Url.to("trabajador/mantenedor/view"),
		controller:'worker.viewController',
		resolve:{
			worker:['apiServices','$route',function(apiServices,$route){
				return apiServices.model('trabajador').get($route.current.params.id);
			}]
		}

	})

	//Evaluación
	.when('/evaluation/adminevaluation',{
		templateUrl:Url.to("evaluation/adminevaluation"),
		controller:"evaluation.adminevaluationController",
		resolve:{
			evaluation:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("evaluacionteorica").get();
			}]
		}
	})

	.when('/evaluation/admincategoria',{
		templateUrl:Url.to("evaluation/clasificacion/admincategoria"),
		controller:"evaluation.admincategoriaController",
		resolve:{
			categorias:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("clasificacioncategoria").get();
			}]
		}
	})
	
	.when('/evaluation/admintipo',{
		templateUrl:Url.to("evaluation/admintipo"),
		controller:"evaluation.admintipoController",
		resolve:{
			tipos:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("evaluaciontipo").getAll();
			}]
		}
	})

	.when('/evaluation/adminclasificacion',{
		templateUrl:Url.to("evaluation/clasificacion/adminclasificacion"),
		controller:"evaluation.adminclasificacionController",
		resolve:{
			clasificaciones:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("clasificacion").expand('categoria').get();
			}]
		}
	})

	.when('/evaluation/adminclasificacionperfil',{
		templateUrl:Url.to("evaluation/clasificacion/adminclasificacionperfil"),
		controller:"evaluation.adminclasificacionperfilController",
		resolve:{
			clasificacionperfiles:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("clasificacionperfil").expand('clasificacion,perfil').get();
			}]
		}
	})
	
	.when('/evaluation/createevaluation',{
		templateUrl:Url.to("evaluation/createevaluation"),
		controller:"evaluation.createevaluationController",
	})

	.when('/evaluation/createcategoria',{
		templateUrl:Url.to("evaluation/clasificacion/createcategoria"),
		controller:"evaluation.createcategoriaController",
	})

	.when('/evaluation/createtipo',{
		templateUrl:Url.to("evaluation/createtipo"),
		controller:"evaluation.createtipoController",
	})


	.when('/evaluation/createpregunta/:id',{
		templateUrl:Url.to("evaluation/createpregunta"),
		controller:"evaluation.createpreguntaController",
	})

	.when('/evaluation/createclasificacion',{
		templateUrl:Url.to("evaluation/clasificacion/createclasificacion"),
		controller:"evaluation.createclasificacionController",
	})

	.when('/evaluation/createclasificacionperfil',{
		templateUrl:Url.to("evaluation/clasificacion/createclasificacionperfil"),
		controller:"evaluation.createclasificacionperfilController",
	})

	.when('/evaluation/editevaluation/:id',{
		templateUrl:Url.to("evaluation/editevaluation"),
		controller:'evaluation.editevaluationController',
		resolve:{
			evaluation:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("evaluacionteorica").get($route.current.params.id);
			}]
		}
	})

	.when('/evaluation/editcategoria/:id',{
		templateUrl:Url.to("evaluation/clasificacion/editcategoria"),
		controller:'evaluation.editcategoriaController',
		resolve:{
			categoria:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("clasificacioncategoria").get($route.current.params.id);
			}]
		}
	})

	.when('/evaluation/edittipo/:id',{
		templateUrl:Url.to("evaluation/edittipo"),
		controller:'evaluation.edittipoController',
		resolve:{
			tipo:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("evaluaciontipo").get($route.current.params.id);
			}]
		}
	})

	.when('/evaluation/editpregunta/:id',{
		templateUrl:Url.to("evaluation/editpregunta"),
		controller:'evaluation.editpreguntaController',
		resolve:{
			pregunta:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("evaluacionpregunta").expand('alternativas,recursos,rhs,sources').get($route.current.params.id);
			}]
		}
	})

	.when('/evaluation/editclasificacion/:id',{
		templateUrl:Url.to("evaluation/clasificacion/editclasificacion"),
		controller:'evaluation.editclasificacionController',
		resolve:{
			clasificacion:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("clasificacion").expand('categoria').get($route.current.params.id);
			}]
		}
	})

	.when('/evaluation/editclasificacionperfil/:id',{
		templateUrl:Url.to("evaluation/clasificacion/editclasificacionperfil"),
		controller:'evaluation.editclasificacionperfilController',
		resolve:{
			clasificacionperfil:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("clasificacionperfil").expand('clasificacion,perfil').get($route.current.params.id);
			}]
		}
	})

	.when('/evaluation/:id',{
		templateUrl:Url.to("evaluation/viewevaluation"),
		controller:'evaluation.viewevaluationController',
		resolve:{
			evaluation:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("evaluacionteorica").expand('preguntas').get($route.current.params.id);
			}],
		}
	})

	.when('/evaluation/categoria/:id',{
		templateUrl:Url.to("evaluation/clasificacion/viewcategoria"),
		controller:'evaluation.viewcategoriaController',
		resolve:{
			categoria:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("clasificacioncategoria").get($route.current.params.id);
			}],
		}
	})

	.when('/evaluation/tipo/:id',{
		templateUrl:Url.to("evaluation/viewtipo"),
		controller:'evaluation.viewtipoController',
		resolve:{
			tipo:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("evaluaciontipo").get($route.current.params.id);
			}]
		}
	})
	.when('/evaluation/clasificacion/:id',{
		templateUrl:Url.to("evaluation/clasificacion/viewclasificacion"),
		controller:'evaluation.viewclasificacionController',
		resolve:{
			clasificacion:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("clasificacion").expand('categoria').get($route.current.params.id);
			}]
		}
	})
	.when('/evaluation/clasificacionperfil/:id',{
		templateUrl:Url.to("evaluation/clasificacion/viewclasificacionperfil"),
		controller:'evaluation.viewclasificacionperfilController',
		resolve:{
			clasificacionperfil:['apiServices','$route',function(apiServices,$route){
				return apiServices.model("clasificacionperfil").expand('clasificacion,perfil').get($route.current.params.id);
			}]
		}
	})

	//Perfil

	.when('/perfil/admin',{
		templateUrl:Url.to("perfil/admin"),
		controller:"perfil.adminperfilController",
		resolve:{
			perfiles:['apiServices',function(apiServices){
				return apiServices.model('perfil').getAll();
			}]
		}

	})
	.when('/perfil/create',{
		templateUrl:Url.to("perfil/create"),
		controller:"perfil.createperfilController",
	})
	.when('/perfil/edit/:id',{
		templateUrl:Url.to("perfil/edit"),
		controller:'perfil.editperfilController',
		resolve:{
			perfil:['apiServices','$route',function(apiServices,$route){
				return apiServices.model('perfil').get($route.current.params.id);
			}]
		}
	})
	.when('/perfil/:id',{
		templateUrl:Url.to("perfil/view"),
		controller:'perfil.viewperfilController',
		resolve:{
			perfil:['apiServices','$route',function(apiServices,$route){
				return apiServices.model('perfil').expand('modulos,evateorica').get($route.current.params.id);
			}]
		}
	})

	.otherwise({


	});

}])