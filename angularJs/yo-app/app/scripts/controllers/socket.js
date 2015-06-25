'use strict';

var app = angular.module( 'yoAppApp' );

// We define a factory the socket service is instantiated only once, and
// thus act as a singleton for the scope of the application
app.factory( 'socket', function ( $rootScope ) {
	var socket = io.connect( 'http://localhost:8080' );
	return {
		on: function ( eventName, callback ) {
			socket.on( eventName, function () {
				var args = arguments;
				$rootScope.$apply( function () {
					callback.apply( socket, args );
				} );
			} );
		},
		emit: function ( eventName, data, callback ) {
			socket.emit( eventName, data, function () {
				var args = arguments;
				$rootScope.$apply( function () {
					if ( callback ) {
						callback.apply( socket, args );
					}
				} );
			} )
		}
	};
} );

function socketCtrl( $scope, socket ) {

	$scope.message = '';
	$scope.messages = [];

	// When we see a new msg event from the server
	socket.on( 'new:msg', function ( message ) {
		$scope.messages.push( message );
	} );

	// Tell the server there is a new message
	$scope.broadcast = function () {
		socket.emit( 'broadcast:msg', {
			message: $scope.message
		} );
		$scope.messages.push( $scope.message );
		$scope.message = '';
	};
}

// var express = require( 'express' ),
//  app = express(),
//  server = require( 'http' )
//  .createServer( app ),
//  io = require( 'socket.io' )
//  .listen( server );

// server.listen( 8080 );

// app.get( '/', function ( req, res ) {
//  res.sendfile( __dirname + '/index.html' );
// } );

// app.get( '/app.js', function ( req, res ) {
//  res.sendfile( __dirname + '/app.js' );
// } );

// io.sockets.on( 'connection', function ( socket ) {
//  socket.emit( 'new:msg', 'Welcome to AnonBoard' );

//  socket.on( 'broadcast:msg', function ( data ) {
//    // Tell all the other clients (except self) about the new message
//    socket.broadcast.emit( 'new:msg', data.message );
//  } );
// } );