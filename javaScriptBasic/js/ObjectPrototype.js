function Person( name ) {
	this.name = name;
}
Person.prototype.describe = function () {
	return 'Person called ' + this.name;
};

// create the constructor Employee as a subconstructor of Person
function Employee( name, title ) {
	Person.call( this, name );
	this.title = title;
}
Employee.prototype = Object.create( Person.prototype );
Employee.prototype.constructor = Employee;
Employee.prototype.describe = function () {

	return Person.prototype.describe.call( this ) + ' (' + this.title + ')';
};

/*----- working with objects ------*/

var jane = {
	name: 'Jane',
	'not an identifier': 123,
	describe: function () { // method
		return 'Person named ' + this.name;
	},
};
// Call a method:
// console.log( jane.describe() );

var obj = {};
Object.defineProperty( obj, 'protoKey', {
	'value': 'tan ngoc huynh',
	'writable': true
} );
var t = Object.getOwnPropertyDescriptor( obj, 'protoKey' );
console.log( t );

// Protecting objects
Object.preventExtensions( obj );
Object.isExtensible( obj );
Object.seal( obj );
Object.isSealed( obj );
Object.freeze( obj );
Object.isFrozen( obj );

// Methods of all objects
Object.prototype.toString();
Object.prototype.valueOf();
Object.prototype.toLocaleString();
Object.prototype.isPrototypeOf( obj );
Object.prototype.hasOwnProperty( key );
Object.prototype.propertyIsEnumerable( propKey );