  'use strict';
  angular.module( 'fakeBrowser', [] )

  .config( [ '$provide', function ( $provide ) {

  	$provide.decorator( '$browser', function ( $delegate, baseHref, initUrl ) {

  		$delegate.onUrlChange = function ( fn ) {
  			this.urlChange = fn;
  		};

  		// $delegate.url = function () {
  		// 	return initUrl;
  		// };

  		$delegate.defer = function ( fn, delay ) {
  			setTimeout( function () {
  				fn();
  			}, delay || 0 );
  		};

  		// $delegate.baseHref = function () {
  		//  return baseHref;
  		// };
  		return $delegate;
  	} );
  } ] );