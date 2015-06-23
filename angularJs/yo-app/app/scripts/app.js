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
    'fake-browser',
    'address-bar'
  ] )
	.config( function ( $routeProvider ) {
		$routeProvider
			.when( '/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			} )
			.when( '/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl'
			} )
			.when( '/directive', {
				templateUrl: 'views/directive.html',
				controller: 'DirectiveCtrl'
			} )
			.when( '/using-location-service', {
				templateUrl: 'views/using-location-service.html',
				controller: 'LocationCtrl'
			} )
			.otherwise( {
				redirectTo: '/'
			} );
	} );