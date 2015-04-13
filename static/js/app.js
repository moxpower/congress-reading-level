angular.module('polsApp', [])

.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
})

.factory('pols',['$http', function($http) {
	return $http.get('/fetch_pols')
		.success(function(data) {
			return data;
		})
		.error(function(err) {
			return err;
		});
}])

.controller('displayController', ['$scope', 'pols', function($scope, pols) {
	$scope.pol_list = [];
	pols.success(function(data) {
		$scope.pol_list = data['items'];  // all data is JSONified on back-end into 'items' property
	});
}])

.directive('polList', function() {
	return {
		restrict: 'E',
		replace: false,
		// scope: {
		// 	all_pols: '='
		// },
		templateUrl: 'templates/polList.html',
	};
});