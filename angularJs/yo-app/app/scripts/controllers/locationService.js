  'use strict';
  angular.module( 'yoAppApp' )

  .constant( 'initUrl', 'http://www.example.com/index.html#!/path?a=b#h' )
  	.constant( 'baseHref', 'index.html' )
    .value( '$sniffer', {
      history: false
    } )
  	.config( [ '$locationProvider', function ( $locationProvider ) {
  		$locationProvider.html5Mode( true )
  			.hashPrefix( '!' );

     } ] )

  .controller( "LocationCtrl", [ '$scope', '$location', function ( $scope, $location ) {

  		$scope.$location = {};
  		angular.forEach( "protocol host port path search hash".split( " " ), function ( method ) {
  			$scope.$location[ method ] = function () {
  				var result = $location[ method ].call( $location );
  				return angular.isObject( result ) ? angular.toJson( result ) : result;
  			};
  		} );
  } ] )
  	.run( function ( $rootElement ) {
  		$rootElement.on( 'click', function ( e ) {
  			e.stopPropagation();

  		} );
  	} );