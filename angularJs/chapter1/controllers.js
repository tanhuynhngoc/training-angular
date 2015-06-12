function HelloController( $scope ) {
	$scope.greeting = {
		text: 'Hello the first once'
	};
}


function CartController( $scope, $location ) {
	console.log( $location );
	$scope.items = [

		{
			title: 'tan huynh',
			price: 10,
			quantity: 2
		},
		{
			title: 'tan ngoc',
			price: 100,
			quantity: 4
		},
		{
			title: 'tan ngoc huynh',
			price: 100,
			quantity: 8
		}
	];

	$scope.remove = function ( index ) {
		console.log( index )
		$scope.items.splice( index, 1 );
	}
}