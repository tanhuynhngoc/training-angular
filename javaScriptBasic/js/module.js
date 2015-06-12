var myModule = (function() {

	// object literals can contain properties and methods.
	var myConfig = {
		useCaching: true,
		language: "en"
	};

	return {

		saySomething: function() {
			return document.write("This is sample structure module of Tan Huynh?<br />");
		},

		// output a value based on the current configuration
		reportMyConfig: function() {
			return document.write("Caching is: " + (myConfig.useCaching ? "enabled" : "disabled") + "<br /> Language is: "+ myConfig.language + "<br />");
		},

		// override the current configuration
		updateMyConfig: function(newConfig) {

			if (typeof newConfig === "object") {
				myConfig = newConfig;
			}
		}
	};

})();