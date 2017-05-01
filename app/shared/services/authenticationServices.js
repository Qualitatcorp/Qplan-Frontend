angular.module('ApiRest')
.service('authenticationServices', ['WebApiConfig','$http','sessionServices', function(WebApiConfig,$http,session){
	return {
		credential:function(user,pass,refresh,grant_type){
			var newCredential={
				'username':user,
				'password':pass,
				'grant_type':grant_type||"password",
				'client_id':WebApiConfig.REST.client_id,
				'client_secret':WebApiConfig.REST.client_secret,
				'refresh':refresh||"false"
			};
			return $http.post(WebApiConfig.authenticationUrl,newCredential);
		},
		set identity(User){
			sessionStorage.setItem('identity',JSON.stringify(User.scope));
			session.token=User.access_token;
		},
		get identity(){
			sessionStorage.getItem('identity');
		},
		renovate:function() {
			if(session.refresh){
				return $http.post(WebApiConfig.refreshUrl,{refresh:session.refresh});
			}else{
				console.log("No se puede actualizar la session");
			}
		}
	};
}])