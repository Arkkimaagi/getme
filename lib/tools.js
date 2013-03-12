/*jshint node:true */
// We're using srand library for our seeded random generation.
var srand = require("srand");

/*
 * Contains tools for the library and general use, this is not the main focus of Getme.
 * @memberof module:getme
 * @type {Object}
 */
var tools = module.exports;

//---------------------------------------------------------------------------------------------------------------------
/*
 * Provides a quick access to math helpers.
 * @memberof module:getme
 * @type {Object}
 */
tools.math = {};

/**
 * Clamps value between min and max
 * @memberof module:getme
 * @param  {Float} value Your numeric value
 * @param  {Float} min   minimum limit
 * @param  {Float} max   maximum limit
 * @return {Float}       number that's between min and max
 */
tools.math.clamp = function(value,min,max){
		if(value<min){
			value = min;
		}
		if(value>max){
			value=max;
		}
		return value;
	};

/**
 * Init the random function without triggering random
 * @memberof module:getme
 * @param  {Int} seed Seed number for resetting the seeded random
 */
tools.math.seed = function(seed){
		srand.seed(seed);
	};

/**
 * Get the seeded random (with optional seeding before it)
 * @memberof module:getme
 * @param  {Int} seed Optional seed number for resetting the seeded random
 * @return {Float}      "Random" number based on the seed value and iterations after seeding
 */
tools.math.srand = function(seed){
		if(seed){
			srand.seed(seed);
		}
		return srand.random();
	};

/**
 *  * Get normal random
 * @memberof module:getme
 * @param  {Boolean} useSeed Option to turn seeded random on instead of regular random
 * @param  {Int} seed    Optional seed number for using with seeded random
 * @return {Float}         Either true random number or seeded random number
 */
tools.math.random = function(useSeed, seed){
		if(useSeed){
			return tools.math.srand(seed);
		}
		return Math.random();
	};


//---------------------------------------------------------------------------------------------------------------------
/*
 * Tools for Getme to use, and possibly handy elsewhere too.
 * @memberof module:getme
 * @type {Object}
 */
tools.string = {};

/**
 * Changes first letter to be in CAPS
 * @memberof module:getme
 * @param  {String} string Text to be capitalized
 * @return {String}        Text with first letter capitalized
 */
tools.string.first_letter_caps = function(string){
	return string.charAt(0).toUpperCase() + string.slice(1);
};
