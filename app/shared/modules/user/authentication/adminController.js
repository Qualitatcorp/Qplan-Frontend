/**
* Authentications Module
*
* Description
*/
angular.module('User')
.controller('authentication.adminCtrl', ['$scope','models','apiServices', function ($scope,models,api) {
	var authenticationServices=api.model('userauthentication').expand('user,client').sort('-expire');
	$scope.models=models.data;
	$scope.page={
		total:models.headers('x-pagination-total-count'),
		current:models.headers('x-pagination-current-page'),
		perPage:models.headers('x-pagination-per-page'),

		change:function() {
				authenticationServices.page(this.current).perPage(this.perPage).get().then(function(q) {
					$scope.models=q.data;
					console.log(q);
				})
		}
	}
}])