/*jshint node:true */

var _ = require("lodash");

// Get the list of all supported languages.
var supported_languages = require("./supported_languages.js");

// This is where we store languages for internal use
var languages = module.exports;

// Populate all supported languages
_.forEach(supported_languages, function(language, key, collection){
	languages[language] = require("./"+language+"/lang.js");
});