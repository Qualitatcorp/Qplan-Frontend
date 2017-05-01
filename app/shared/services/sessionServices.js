angular.module('ApiRest')
.factory('sessionServices', [function(){
	return {
		set token(token){
			console.log("Se almaceno token : " + token);
			sessionStorage.access_token=token;
		},
		get token (){
			console.log("Token valido por : "+this.timeOut.getMinutes()+" minutos");
			if(this.expire){
				return null;
			}else{
				return sessionStorage.access_token;
			}
		},
		set refresh(token){
			console.log("Se almaceno refresh : " + token);
			sessionStorage.access_refresh=token;
		},
		get refresh (){
			return sessionStorage.access_refresh;
		},
		set expire_in(timeUnix){
			console.log("La sesion dura : " + timeUnix/60+" minutos.");
			sessionStorage.expire_in=Date.now()+timeUnix*1000;
		},
		set client(c){
			sessionStorage.cliend_id=c;
		},
		get client(){
			return sessionStorage.cliend_id;
		},
		get expire(){
			return (sessionStorage.expire_in===undefined||(Date.now()>Number(sessionStorage.expire_in)));
		},
		get timeOut(){
			return new Date(Number(sessionStorage.expire_in)-Date.now());
		},
		logout:function(){
			delete sessionStorage.access_token;
			delete sessionStorage.access_refresh;
			delete sessionStorage.expire_in;
			delete sessionStorage.cliend_id;
		}
	}
}])