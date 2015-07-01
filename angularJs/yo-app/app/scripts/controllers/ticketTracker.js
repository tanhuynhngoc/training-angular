'use strict';

var app = angular.module( 'yoAppApp' );

app.controller( 'headerTicket', [ '$scope', '$location', function ( $scope, $location ) {
	$scope.isActive = function ( viewLocation ) {
		return viewLocation === $location.path();
	};
} ] );