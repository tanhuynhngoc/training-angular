'use strict';

var app = angular.module( 'yoAppApp' );

app.directive( 'myCustomer', function () {
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
	};
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
} ] )

.directive( 'datepicker', function () {
	return {
		// Enforce the angularJS default of restricting the directive to
		// attributes only
		restrict: 'A',
		// Always use along with an ng-model
		require: '?ngModel',
		// This method needs to be defined and passed in from the
		// passed in to the directive from the view controller
		scope: {
			select: '&' // Bind the select function we refer to the right scope
		},
		link: function ( scope, element, attrs, ngModel ) {

			if ( !ngModel ) return;

			var optionsObj = {};

			optionsObj.dateFormat = 'mm/dd/yy';
			var updateModel = function ( dateTxt ) {
				scope.$apply( function () {
					// Call the internal AngularJS helper to
					// update the two way binding
					ngModel.$setViewValue( dateTxt );
				} );
			};

			optionsObj.onSelect = function ( dateTxt, picker ) {
				updateModel( dateTxt );
				if ( scope.select ) {
					scope.$apply( function () {
						scope.select( {
							date: dateTxt
						} );
					} );
				}
			};

			ngModel.$render = function () {
				// Use the AngularJS internal 'binding-specific' variable
				element.datepicker( 'setDate', ngModel.$viewValue || '' );
			};
			element.datepicker( optionsObj );
		}
	};
} )

// animate service
.directive( "elementGlow", function ( $animate ) {
	// Initialization
	var unwatchProperty = null;

	// Definition object
	return {
		// Post-link function
		link: function ( scope, element, attrs ) {
			var watchedProperty = attrs.elementGlow;

			if ( watchedProperty !== undefined &&
				watchedProperty !== "" ) {
				unwatchProperty = scope.$watch( watchedProperty,
					function ( newVal, oldVal, scope ) {
						if ( newVal !== oldVal ) {
							if ( newVal ) {
								$animate.animate( element, {
										"box-shadow": "none"
									}, {
										"box-shadow": "0px 0px 15px 5px rgba(135, 206, 250, 0.75)"
									},
									"element-glow-animation"
								);
							} else {
								$animate.animate( element, {
										"box-shadow": "0px 0px 15px 5px rgba(135, 206, 250, 0.75)"
									}, {
										"box-shadow": "none"
									},
									"element-glow-animation"
								);
							}
						}
					} );

				element.one( "$destroy",
					function () {
						// Directive cleanup
						if ( unwatchProperty !== null ) {
							unwatchProperty();

							unwatchProperty = null;
						}
					} );
			}
		}
	};
} );