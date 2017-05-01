angular.module('ApiRest')
.service('trabajadorStorage', [
	function(){
		return {
			set q(value){
				sessionStorage.setItem('trabajador',JSON.stringify(value));
			},
			get q(){
				return JSON.parse(sessionStorage.getItem('trabajador'));
			}
		}
	}
])