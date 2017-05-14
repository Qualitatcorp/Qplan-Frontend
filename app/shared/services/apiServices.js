angular.module('ApiRest')
.service('apiServices', ['WebApiConfig','$http','$httpParamSerializer','sessionServices',
	function(WebApiConfig,$http,$httpParamSerializer,session){
		return {
			_base:null,
			_primaryKey:"id",
			_params:{},

			request:function(src){
				return  _.compact([_.compact(src).join("/"),$httpParamSerializer(this._params)]).join("?");
			},
			get:function(id){
				this.credential();
				return $http.get(this.request([WebApiConfig.resourceUrl(this._base),id]));
			},
			getAll:function(){
				return this.get();
			},
			search:function(){
				this.credential();
				return $http.get(WebApiConfig.resourceUrl(this._base)+'/search?'+$httpParamSerializer(this._params));
			},
			save:function(model){
				this.credential();
				return (model[this._primaryKey])?$http.put([WebApiConfig.resourceUrl(this._base),model[this._primaryKey]].join('/'),model):$http.post(WebApiConfig.resourceUrl(this._base),model);
			},
			remove:function(id){
				this.credential();
				return $http.delete([WebApiConfig.resourceUrl(this._base),id].join('/'));
			},
			params:function(p){
				this._params={};
				angular.extend(this._params,p);
				return this;
			},
			fields:function(r){
				angular.extend(this._params,{fields:r});
				return this;
			},			
			expand:function(r){
				this._params={};
				angular.extend(this._params,{expand:r});
				return this;
			},			
			sort:function(r){
				angular.extend(this._params,{sort:r});
				return this;
			},			
			page:function(r){
				angular.extend(this._params,{page:r});
				return this;
			},
			perPage:function(r){
				angular.extend(this._params,{'per-page':r});
				return this;
			},
			model:function(r,p){
				angular.extend(this,{
					_base:r,
					_primaryKey:p||this._primaryKey,
					_params:{}
				});
				return angular.copy(this);
			},
			credential:function() {
				if(!session.expire){$http.defaults.headers.common.Authorization="Bearer "+session.token;}else{delete $http.defaults.headers.common.Authorization;}
			}
		}
	}
	])
