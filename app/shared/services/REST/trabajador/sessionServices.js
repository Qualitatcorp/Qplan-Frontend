angular.module('ApiRest')
.factory('sessionServices', [function(){
	return {
		set token(token){
			console.log("Se almaceno token : " + token);
			sessionStorage.eva_access_token=token;
		},
		get token (){
			console.log("Token valido por : "+this.timeOut.getMinutes()+" minutos");
			if(this.expire){
				return null;
			}else{
				return sessionStorage.eva_access_token;
			}
		},
		set refresh(token){
			console.log("Se almaceno refresh : " + token);
			sessionStorage.eva_access_refresh=token;
		},
		get refresh (){
			return sessionStorage.eva_access_refresh;
		},
		set expire_in(timeUnix){
			console.log("La sesion dura : " + timeUnix/60+" minutos.");
			sessionStorage.eva_expire_in=Date.now()+timeUnix*1000;
		},
		get expire(){
			return (sessionStorage.eva_expire_in===undefined||(Date.now()>Number(sessionStorage.eva_expire_in)));
		},
		get timeOut(){
			return new Date(Number(sessionStorage.eva_expire_in)-Date.now());
		},
		logout:function(){
			delete sessionStorage.eva_access_token;
			delete sessionStorage.eva_access_refresh;
			delete sessionStorage.eva_expire_in;
			delete sessionStorage.eva_cliend_id;
		}
	}
}])