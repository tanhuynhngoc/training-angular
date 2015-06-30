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
    'fakeBrowser',
    'addressBar',
    'angularUtils.directives.dirPagination'
  ] )
	.config( [ '$routeProvider', function ( $routeProvider ) {
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
			.when( '/cheatsheet-recipes', {
				templateUrl: 'views/cheatsheet-recipes.html',
				controller: 'datepickerCtrl'
			} )
			.otherwise( {
				redirectTo: '/'
			} );


	} ] );