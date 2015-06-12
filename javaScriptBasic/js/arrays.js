function add( prev, cur ) {
	console.log( prev, cur );
	return prev + cur;
}
console.log( [ 10, 1, -2 ].reduce( add ) ); // 12