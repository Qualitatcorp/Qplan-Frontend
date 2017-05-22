angular.module('ApiRest')
.factory('sessionServices', [function(){
	return {
		set token(token){
			console.log("Se almaceno token : " + token);
			sessionStorage.admin_access_token=token;
		},
		get token (){
			console.log("Token valido por : "+this.timeOut.getMinutes()+" minutos");
			if(this.expire){
				return null;
			}else{
				return sessionStorage.admin_access_token;
			}
		},
		set refresh(token){
			console.log("Se almaceno refresh : " + token);
			sessionStorage.admin_access_refresh=token;
		},
		get refresh (){
			return sessionStorage.admin_access_refresh;
		},
		set expire_in(timeUnix){
			console.log("La sesion dura : " + timeUnix/60+" minutos.");
			sessionStorage.admin_expire_in=Date.now()+timeUnix*1000;
		},
		set scope(c){
			console.log(c);
			sessionStorage.admin_scope=JSON.stringify(c);
		},
		get scope(){
			return JSON.parse(sessionStorage.admin_scope);
		},
		get expire(){
			return (sessionStorage.admin_expire_in===undefined||(Date.now()>Number(sessionStorage.admin_expire_in)));
		},
		get timeOut(){
			return new Date(Number(sessionStorage.admin_expire_in)-Date.now());
		},
		logout:function(){
			delete sessionStorage.admin_access_token;
			delete sessionStorage.admin_access_refresh;
			delete sessionStorage.admin_expire_in;
			delete sessionStorage.admin_cliend_id;
		}
	}
}])