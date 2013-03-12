var definitions = require('./definitions.js');

var lang = {

	male_first_name: function () {
		return definitions.male_first_name();
	},

	female_first_name: function () {
		return definitions.female_first_name();
	},

	first_name: function () {
		return definitions.male_first_name().concat(definitions.fi_female_first_name());
	},
	
	last_name: function () {
		return definitions.last_name();
	},

	company: function () {
		return definitions.company();
	}

};

module.exports = lang;