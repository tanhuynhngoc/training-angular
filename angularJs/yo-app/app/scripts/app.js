'use strict';

/**
 * @ngdoc overview
 * @name yoAppApp
 * @description
 * # yoAppApp
 *
 * Main module of the application.
 */
angular
	.module( 'yoAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'addressBar',
    'fakeBrowser',
    'angularUtils.directives.dirPagination',
    'firebase',
    'TicketApp'
  ] )

// URL to connect to Firebase backend
.value( 'fbURL', 'https://tanhuynh-angulardemo.firebaseio.com/' )

.config( [ '$routeProvider', function ( $routeProvider ) {
		$routeProvider
			.when( '/main', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl',
				title: 'Home'
			} )
			.when( '/directive', {
				templateUrl: 'views/directive.html',
				controller: 'DirectiveCtrl',
				title: 'Directive'
			} )
			.when( '/using-location-service', {
				templateUrl: 'views/using-location-service.html',
				controller: 'LocationCtrl',
				title: 'Location service'
			} )
			.when( '/cheatsheet-recipes', {
				templateUrl: 'views/cheatsheet-recipes.html',
				controller: 'datepickerCtrl',
				title: 'cheatsheet recipes'
			} )
			.when( '/ticket-tracker', {
				templateUrl: 'views/ticket-tracker.html',
				controller: 'ticketTrackerCtrl',
				title: 'Accessibility Ticket Tracker'
			} )
			.when( '/ticket-create', {
				templateUrl: 'views/ticket-create.html',
				controller: 'createTicketCtrl',
				title: 'Create Ticket'
			} )
			.otherwise( {
				redirectTo: '/main'
			} );


	} ] )
	.run( [ '$route', '$rootScope', function ( $location, $rootScope ) {

		$rootScope.$on( '$routeChangeSuccess', function ( event, current, previous ) {

			// Test for current route
			if ( current.$$route ) {

				$rootScope.title = current.$$route.title;
			}

		} );


	} ] );