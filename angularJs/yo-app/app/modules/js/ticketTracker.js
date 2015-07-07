'use strict';

var app = angular.module( 'TicketApp', [] );

app.controller( 'headerTicket', [ '$scope', '$location', function ( $scope, $location ) {
	$scope.isActive = function ( viewLocation ) {
		return viewLocation === $location.path();
	};
} ] );

app.controller( 'ticketTrackerCtrl', [ 'Tickets', 'Flash', '$scope', '$rootScope', function ( Tickets, Flash, $scope, $rootScope ) {

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
// Create and Edit A Ticket View Controller
// =================================

app.controller( 'createEditTicketCtrl', [ '$scope', '$rootScope', 'Tickets', '$location', '$routeParams', '$firebaseObject', 'fbURL', 'WcagscService', 'SeverityLevelService', 'Flash', function ( $scope, $rootScope, Tickets, $location, $routeParams, $firebaseObject, fbURL, WcagscService, SeverityLevelService, Flash ) {

	//Load success criterion into template to use in select menus
	$scope.wcagSCList = WcagscService.wcagSCList;
	$scope.severityList = SeverityLevelService.severityList;

	// Clear any flash variables we have stored
	Flash.setMessage( '' );

	// check the existing of param id
	var paramsId = $routeParams.id;

	if ( paramsId ) { // handle for case edit tickes

		// create new connection to firebase and pass id of record
		var ticketUrl = new Firebase( fbURL + paramsId );

		// retrive current record as object
		var ticketsObject = $firebaseObject( ticketUrl );

		// Add record to scope
		$scope.tickets = ticketsObject;

		// track record id so that we can set focus back to edit button if user hits cancel
		$rootScope.lastTicketID = $scope.tickets.$id;

		// once the firebase record has loaded update page title to include summary title
		ticketsObject.$loaded()
			.then( function ( object ) {
				$rootScope.title = $rootScope.title + ' - ' + object.summary;
				$rootScope.lastTicketID = object.$id;
			} );

		// handle form submits
		$scope.edit = function ( inValid ) {
			if ( inValid ) {

				$scope.submitted = true;
			} else {

				//if form has no errors - save results to database
				var edit = $scope.tickets.$save();

				if ( edit ) {

					Flash.setMessage( 'Record Saved!' );
					$location.path( 'ticket-tracker' );
				} else {
					alert( 'something went wrong' );
				}
			}
		};


	} else { // handle for case create tickets

		// Handle form submits (with errors)
		$scope.add = function ( inValid ) {

			// Need to check if a check box has a value if not assign
			// it a value of false or will not get submitted
			if ( !$scope.resolved ) {
				$scope.resolved = false;
			}

			// Check if angular error check marked for as invalid
			if ( inValid ) {

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
					$rootScope.search = '';

					// set flash message to be displayed
					Flash.setMessage( 'Ticket Created!' );

					// send user to main screen
					$location.path( 'ticket-tracker' );
				} else {

					// if not successful warn user
					alert( 'something went wrong' );
				}
			}
		};

	}



	// Cancel button function
	$scope.go = function ( path ) {

		// indicate last form viewed
		$rootScope.lastForm = ticketUrl ? 'edit' : 'create';
		console.log( $rootScope.lastForm );

		// send user to path provided in ng-click
		$location.path( path );
	};

} ] );