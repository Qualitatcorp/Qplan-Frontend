"use strict"
/**
* ApiRest Module
*
*/
angular.module('ApiRest', [])
.factory('WebApiConfig',function(){
	return {
		REST:{
			app:'admin',
			host:'/api',
			auth:'authentication',
			token:'token',
			refresh:'refresh',
			version:'v1',
			client_id:'qplan-admin',
			client_secret:'8XwxUrTssx'
		},
		get hostUrl(){
			return [this.REST.host,this.REST.version].join('/');
		},
		get authenticationUrl(){
			return [this.REST.host,this.REST.auth,this.REST.token].join('/');
		},		
		get refreshUrl(){
			return [this.REST.host,this.REST.auth,this.REST.refresh].join('/');
		},
		resourceUrl:function(model){
			return [this.REST.host,this.REST.version,model].join('/');
		}
	}
})
