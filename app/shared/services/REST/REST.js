"use strict"
/**
* ApiRest Module
*
*/
angular.module('ApiRest', [])
// Deberia ser una provider
.factory('WebApiConfig',function(){
	var REST={
		host:'Qplan-Backend/web',
		auth:'authentication',
		token:'token',
		version:'v1',
		client_id:'qplan-evaluacion',
		client_secret:'qualitat2016'
	}
	return {
		get hostUrl(){
			return [REST.host,REST.version].join('/');
		},
		get authenticationUrl(){
			return [REST.host,REST.auth,REST.token].join('/');
		},
		resourceUrl(model){
			return [REST.host,REST.version,model].join('/');
		},
		get REST(){
			return REST;
		}
	}
})
.factory('sessionServices', [function(){
	return {
		set token(token){
			console.log("se almaceno accesstoken : " + token);
			sessionStorage.access_token=token;
		},
		get token (){
			if(this.expire){
				console.log("El token a expirado o no existe");
				this.removeToken();
				return null;
			}
			return sessionStorage.access_token;
		},		
		set refresh(token){
			console.log("se almaceno refresh : " + token);
			sessionStorage.access_refresh=token;
		},
		get refresh (){
			return sessionStorage.access_refresh;
		},
		set expire(timeUnix){
			console.log("se almaceno date : " + timeUnix);
			var now=new Date();
			sessionStorage.expire_in=new Date(now+timeUnix*1000);
		},
		get expire(){
			return (new Date()>Date.parse(sessionStorage.expire_in)
		},
		removeToken(){
            sessionStorage.removeItem('access_token');
		},
		exist(){
			return (sessionStorage.getItem('access_token')!==undefined);
		},
		get headers(){return {headers:{Authorization: "Bearer "+this.token}};}
	}
}])
.factory('authenticationServices', ['WebApiConfig','$http','sessionServices', function(WebApiConfig,$http,sessionServices){
	return {
		credential(user,pass,grant_type="password"){
			var newCredential={
				'username':user,
				'password':pass,
				'grant_type':grant_type,
				'client_id':WebApiConfig.REST.client_id,
				'client_secret':WebApiConfig.REST.client_secret
			};
			return $http.post(WebApiConfig.authenticationUrl,newCredential);
		},
		set identity(User){
			sessionStorage.setItem('identity',JSON.stringify(User.scope));
			sessionServices.token=User.access_token;
		},
		get identity(){
			sessionStorage.getItem('identity');
		}
	};
}])