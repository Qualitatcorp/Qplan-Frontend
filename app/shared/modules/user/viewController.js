angular.module('User')
.controller('user.viewController', ['$scope','toastr','$location','userServices','model',function($scope,toastr,$location,userServices,model){
	$scope.model=model.data;
	if($scope.model.nacimiento)
		$scope.model.nacimiento=new Date($scope.model.nacimiento);
	$scope.back=function() {
		window.history.back();
	}
}])