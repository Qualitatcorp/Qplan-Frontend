/**
* ApiRest Module
*/
angular.module('ApiRest')
.service('reportServices', ['WebApiConfig','$http','$q','sessionServices','$sce','FileSaver','$window',
	function(WebApiConfig,$http,$q,session,$sce,FileSaver,$window){
		return {
			_base:'report',
			_controller:null,
			_action:null,
			get:function(url) {
				this.credential();
				var defered = $q.defer();
				$http.get(this.request([WebApiConfig.REST.host,this._base,this._controller,this._action,url]),{responseType: 'arraybuffer'})
				.then(function(q) {
					q.document={
						file:new Blob([q.data],{type:q.headers('content-type')}),
						get url() {return URL.createObjectURL(this.file)},
						get src() {return $sce.trustAsResourceUrl(this.url);},
						saveAs:function(name) {
							FileSaver.saveAs(this.file,name);
						},
						open:function() {
							$window.open(this.url);
						}
					};
					defered.resolve(q);
				},function(q) {
					defered.reject(q);
				});
				return defered.promise;
			},
			request:function(src) {
				return _.compact(src).join("/");
			},
			init:function(c,a,b) {
				angular.extend(this,{
					_controller:c,
					_action:a,
					_base:b||this._base
				})
				return angular.copy(this);
			},
			credential:function() {
				if(!session.expire){$http.defaults.headers.common.Authorization="Bearer "+session.token;}else{delete $http.defaults.headers.common.Authorization;}
			}
		}
}]);