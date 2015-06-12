	var whiteRabbit = {
		adjective: 'white',
		speak: speak
	}, fatRabbit = {
		adjective: 'fat',
		speak: speak
	};

	whiteRabbit.speak('Oh my ears and whiskers, how late it\'s getting!');
	fatRabbit.speak('I could sure use a carrot right now.');

	// For functions with one argument
	function speak(line) {
		document.write('The ', this.adjective, ' rabbit says \'', line, '\'<br />');
	}

	// use combined with apply function
	speak.apply(fatRabbit, ["Yum."]);

	// use combined with call function
	speak.call(fatRabbit, "Burp.");

	// For functions with more than one argument
	function run(from, to) {
		document.write('The ', this.adjective, ' rabbit runs from ', from, ' to ', to, '.');
	}

	// use combined with call function
	run.call(fatRabbit, 'the cupboard', 'the fridge');

	// use combined with call function
	run.apply(whiteRabbit, ['A', 'B']);

	// Objects as Dictionaries
	function forEachIn(object, action) {
		for (var property in object) {
			if (Object.prototype.hasOwnProperty.call(object, property))
			action(property, object[property]);
		}
	}

	function Dictionary(startValues) {
		this.values = startValues || {};
	}

	Dictionary.prototype.store = function(name, value) {
		this.values[name] = value;
	};

	Dictionary.prototype.lookup = function(name) {
		return this.values[name];
	};

	Dictionary.prototype.contains = function(name) {
		return Object.prototype.propertyIsEnumerable.call(this.values, name);
	};

	Dictionary.prototype.each = function(action) {
		forEachIn(this.values, action);
	};

	var colors = new Dictionary({
		Grover: "blue",
		Elmo: "red",
		Bert: "yellow"
	});

	$gro = colors.contains("Grover");
	console.log($gro);

	$con = colors.contains("constructor");
	console.log($con);

	$store = colors.store("Ernie", "orange");
	console.log($store);

	colors.each(function(name, color) {
		document.write(name, " is ", color, "<br>");
	});

	// Building an Ecosystem Simulation
	function forEach(array,action) {
	    for(var i=0;i<array.length;i++) {
	    	action(array[i]);
	    }
	}

	function forEachIn(object, action) {
	    for (var property in object) {
	        if (Object.prototype.hasOwnProperty.call(object, property))
	        action(property, object[property]);
	    }
	}

	function Dictionary(startValues) {
	    this.values = startValues || {};
	}

	Dictionary.prototype.store = function(name, value) {
	    this.values[name] = value;
	};

	Dictionary.prototype.lookup = function(name) {
	    return this.values[name];
	};

	Dictionary.prototype.contains = function(name) {
	    return Object.prototype.propertyIsEnumerable.call(this.values, name);
	};

	Dictionary.prototype.each = function(action) {
	    forEachIn(this.values, action);
	};