/**
 * @fileoverview Getme is a nonsense generator built for my prototyping needs.
 *
 * @module getme
 * @author Mikko Tapionlinna
 */


/**
 * Version number for the code.
 * @readonly
 * @type {String}
 */
exports.version = "0.1.2"; //It's automatically updated with Grunt

/**
 * Array of supported languages by this version
 * @readonly
 * @type {Array}
 */
exports.supported_languages = require("./lib/languages/supported_languages.js");

/**
 * Sets the language that Getme returns
 * @see #supported_languages
 * @type {String}
 */
exports.lang = "fi";

exports.random = require("./lib/random.js");
exports.tools = require("./lib/tools.js");
