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
		$scope.format = 'M/d/yy h:mm:ss a';

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

	} ] )
	.directive( 'myCustomer', function () {
		return {
			restrict: 'E',
			scope: {
				customerinfo: '=info'
			},
			templateUrl: 'views/my-customer-iso.html'
		};
	} )

// date format
.directive( 'myCurrentTime', [ '$interval', 'dateFilter', function ( $interval, dateFilter ) {

	function link( scope, element, attrs ) {
		var format,
			timeoutId;

		function updateTime() {
			element.text( dateFilter( new Date(), format ) );
		}

		scope.$watch( attrs.myCurrentTime, function ( value ) {
			format = value;
			updateTime();
		} );

		element.on( '$destroy', function () {
			$interval.cancel( timeoutId );
		} );

		// start the UI update process; save the timeoutId for canceling
		timeoutId = $interval( function () {
			updateTime(); // update DOM
		}, 1000 );
	}

	return {
		link: link
	};
  } ] )

// dialog
.directive( 'myDialog', function () {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			'close': '&onClose'
		},
		templateUrl: 'views/my-dialog-close.html'
	}
} )

// drag
.directive( 'myDraggable', [ '$document', function ( $document ) {
	return {
		link: function ( scope, element, attr ) {
			var startX = 0,
				startY = 0,
				x = 0,
				y = 0;

			element.css( {
				position: 'relative',
				border: '1px solid red',
				backgroundColor: 'lightgrey',
				cursor: 'pointer'
			} );

			element.on( 'mousedown', function ( event ) {
				// Prevent default dragging of selected content
				event.preventDefault();
				startX = event.pageX - x;
				startY = event.pageY - y;
				$document.on( 'mousemove', mousemove );
				$document.on( 'mouseup', mouseup );
			} );

			function mousemove( event ) {
				y = event.pageY - startY;
				x = event.pageX - startX;
				element.css( {
					top: y + 'px',
					left: x + 'px'
				} );
			}

			function mouseup() {
				$document.off( 'mousemove', mousemove );
				$document.off( 'mouseup', mouseup );
			}
		}
	};
} ] );