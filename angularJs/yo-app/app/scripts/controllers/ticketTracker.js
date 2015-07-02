'use strict';

var app = angular.module( 'TicketApp', [] );

app.controller( 'headerTicket', [ '$scope', '$location', function ( $scope, $location ) {
	$scope.isActive = function ( viewLocation ) {
		return viewLocation === $location.path();
	};
} ] );

app.controller( 'ticketTrackerCtrl', [ 'Tickets', 'Flash', '$scope', '$rootScope', function ( Tickets, Flash, $scope, $rootScope, $timeout ) {

	$scope.flash = Flash;
	$scope.tickets = Tickets;
	$scope.search = $rootScope.search;

	// track toggle state of record details and sets scope index to current index
	// using ng-class to display table row indexes
	$scope.toggleTicketDetails = function ( e, index ) {

		if ( $scope.index === index ) { // delete scope index
			delete $scope.index;
		} else {
			$scope.index = index;
		}

		e.preventDefault();

		// add delay to allow time for element to render the set focus to header
		// $timeout( function () {
		// 	$( '#ticket-' + index + 'h4' )
		// 		.first()
		// 		.attr( 'tabIndex', -1 )
		// 		.focus();
		// }, 0 );
	};

	// delete record from database
	$scope.remove = function ( id ) {
		Flash.setMessage( 'Record has been Deleted!' );
		Tickets.$remove( id );
	};

	// watch wen search  field is updated and  update global search variable
	$scope.$watch( 'search', function () {
		$rootScope.search = $scope.search;
	} );

} ] );



// =================================
// Create A Ticket View Controller
// =================================

app.controller( 'createTicketCtrl', function ( $scope, $rootScope, Tickets, $location, $routeParams, $firebase, fbURL, WcagscService, SeverityLevelService, Flash ) {

	//Load success criterion into template to use in select menus
	$scope.wcagSCList = WcagscService.wcagSCList;
	$scope.severityList = SeverityLevelService.severityList;

	// Clear any flash variables we have stored
	Flash.setMessage( "" );

	// Handle form submits (with errors)
	$scope.add = function ( inValid ) {

		// Need to check if a check box has a value if not assign
		// it a value of false or will not get submitted
		if ( !$scope.resolved ) {
			$scope.resolved = false;
		}

		// Check if angular error check marked for as invalid
		if ( inValid ) {

			// if there are errors
			// Set focus to the form level error warning
			$( '#error-bucket' )
				.show()
				.attr( "tabIndex", -1 )
				.focus();

			// track that the form was submitted and that field level errors can now be shown
			$scope.submitted = true;

		} else {

			// If form has no errors - save results to database;
			var save = Tickets.$add( {
				summary: $scope.summary,
				description: $scope.description,
				wcagSC: $scope.wcagSC,
				severity: $scope.severity,
				fix: $scope.fix,
				resolved: $scope.resolved
			} );

			if ( save ) {

				// if save into database was successful
				// Clear any search the user had so they can see the new record
				$rootScope.search = "";

				// set flash message to be displayed
				Flash.setMessage( "Ticket Created!" );

				// send user to main screen
				$location.path( "ticket-tracker" );
			} else {

				// if not successful warn user
				alert( 'something went wrong' );
			}
		}
	};


	// Cancel button function
	$scope.go = function ( path ) {

		// indicate last form viewed
		$rootScope.lastForm = "create";

		// send user to path provided in ng-click
		$location.path( path );
	};

} )