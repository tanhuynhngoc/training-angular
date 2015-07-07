var app = angular.module( 'yoAppApp' );

app.controller( 'datepickerCtrl', function ( $scope ) {
	$scope.myText = 'Not Selected';
	$scope.currentDate = '';
	$scope.updateMyText = function ( date ) {
		$scope.myText = 'Selected';
	};
} );