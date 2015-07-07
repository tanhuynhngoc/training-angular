'use strict';

/**
 * @ngdoc function
 * @name yoAppApp.controller:DirectiveCtrl
 * @description
 * # DirectiveCtrl
 * Controller of the yoAppApp
 */
var app = angular.module( 'yoAppApp' );

app.controller( 'DirectiveCtrl', [ '$scope', '$timeout', function ( $scope, $timeout ) {
	$scope.naomi = {
		name: 'TanHuynh',
		address: '1600 Amphitheatre'
	};
	$scope.igor = {
		name: 'TanNgoc',
		address: '123 Somewhere'
	};

	// format date
	$scope.format = 'M/d/yy h:mm:ss';

	// add buttons to this dialog box, and allow someone using the directive to bind their own behavior to it.
	$scope.name = 'Tobias';
	$scope.message = '';
	$scope.hideDialog = function ( message ) {
		$scope.message = message;
		$scope.dialogIsHidden = true;
		$timeout( function () {
			$scope.message = '';
			$scope.dialogIsHidden = false;
		}, 2000 );
	};

	} ] );