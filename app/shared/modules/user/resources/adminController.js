/**
* user.adminController Module
*
* Carga la informacion del los usuarios
*/
angular.module('User')
.controller('resource.adminController', ['$scope','toastr','$location','apiServices','models',function($scope,toastr,$location,apiServices,models){
	// console.log(models);

	var serialize=function(resource,actives) {
		if(actives){

		}else{
			
		}
		var lista=_(resource).map( function(q) {
		  return _(['id','active','modulo','controller','action']).object(_([q.id,false]).union(q.resource.split("_")));
		});
		var group=[];
		var modulos=_(_(lista).pluck('modulo')).uniq();
		modulos.forEach(function(m) {
			var controller=[];
			var controllers = _(_(_(lista).where({modulo:m})).pluck('controller')).uniq();
			controllers.forEach(function(c) {
				controller.push({name:c,actions:_(lista).where({modulo:m,controller:c})});
			})
			group.push({name:m,controller:controller});
		});
		return group;
	}

	$scope.group=serialize(models.data.children);
	$scope.models=models.data;

	$scope.actions=function(actions) {
		console.log(actions);
	}
}])