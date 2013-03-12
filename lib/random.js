/*jshint node:true */

//We use moment for the time stuff
var moment = require("moment");


var tools = require("./tools.js");
var lorem = require("./lorem/definitions.js");


var languages = require("./languages/languages.js");

//Lets set the default language.
var lang = require("./languages/supported_languages.js")[0];

//Lets try to get the default language setting from parent (getme-module)
var getme = module.parent.exports;
lang = (getme&&getme.lang)?getme.lang:lang;

// Returns randomized stuff. The main beef of Getme.
var random = module.exports;

// Private handler for the randomness
function myRandom(){
	return tools.math.random(random.use_seed);
}

/**
 * Set the seed of random function. Use this to "reset" the randomness.
 * @memberof module:getme
 * @tutorial seededrandom
 * @param {int} seed New seed to be used.
 */
random.set_seed = function(seed){
	tools.math.seed(seed);
};

/**
 * Should Getme use seeded fake random or regular random random
 * @memberof module:getme
 * @tutorial seededrandom
 * @type {Boolean}
 */
random.use_seed = false;

/**
 * Coin toss between true and false
 * @memberof module:getme
 * @param  {float} probabilityForTrue Propability for getting true (0.5 = 50%)
 * @return {Boolean}                  Either true or false
 */
random.truefalse = function(probabilityForTrue){
	if(probabilityForTrue===undefined){
		probabilityForTrue=0.5;
	}
	return myRandom()<probabilityForTrue;
};

/**
 * Returns the string "yes" or "no"
 * @memberof module:getme
 * @param  {Float} probabilityForYes Probability for getting "yes" (0.5 = 50%)
 * @return {String}                  "yes" or "no"
 */
random.yesno = function(probabilityForYes){
	return (random.truefalse(probabilityForYes))?"yes":"no";
};

/**
 * Returns a seeded/unseeded random number based on getme.random.use_seed.
 * @memberof module:getme
 * @return {Float} Random number like Math.random()
 */
random.number = function(){
	return myRandom();
};

/**
 * Returns integer between min and max, inclusive
 * @memberof module:getme
 * @param  {Int} min Minimum value that's accepted as result
 * @param  {Int} max Maximum value that's accepted as result
 * @return {Int}     Random integer between min and max
 * @example
//Gets you a random value between 1 and 5 (including the 1 and 5)
var myRandom = getme.random.between(1,5);
 */
random.between = function(min,max){
	if(min === undefined){
		min = 1;
	}
	if(max === undefined){
		return min;
	}
	if(max < min){
		var tmp = max;
		max = min;
		min = tmp;
	}
	return Math.floor(myRandom()*(max-min+1))+min;
};


random.array = {};

/**
 * Returns a new shuffled array based on given array. It's also possible to limit the returned items number.
 * @memberof module:getme
 * @param  {Array} array Array to be used as shuffle base
 * @param  {Int} max Optional maximum number of items to return
 * @return {Array}     Shuffled copy of given array limited to max items
 */
random.array.shuffled = function(array,max){
	max=(max)?max:array.length;
	var newArray = array.slice(0,max);
	for( var i=newArray.length; i>0; i--){
		var j = parseInt(myRandom()*i, 10);
		var tmp = newArray[i];
		newArray[i] = newArray[j];
		newArray[j] = tmp;
	}
	return newArray;
};

/**
 * Returns a random item from an array
 * @memberof module:getme
 * @param  {Array} array From which to choose from
 * @return {*}     Random item from given array
 */
random.array.item = function(array){
	return array[random.between(0,array.length-1)];
};

/**
 * Returns random amount of items from given array.
 * @memberof module:getme
 * @param  {Array} array Target arrayay to choose from
 * @param  {Int} min Optional minimum number of items to choose
 * @param  {Int} max Optional maximum number of items to choose
 * @return {Array}     Random amount of items from given array
 */
random.array.items = function(array,min,max){
	max=(min!==undefined&&max===undefined)?min:max;
	min=(min!==undefined)?min:0;
	max=(max!==undefined)?max:array.length-1;
	return random.array.shuffled(array).slice(0, random.between(min,max));
};

/**
 * Returns random amount (between min and max) of lorem ipsum words
 * @memberof module:getme
 * @param  {Int} min Minimum number of words to return
 * @param  {Int} max Maximum number of words to return
 * @return {Array}     Array of lorem ipsum word strings
 */
random.lorem_words = function(min,max){
	return random.array.items(lorem(),min,max);
};

/**
 * Generayes an lorem ipsum sentence with wordcount between min and max
 * @memberof module:getme
 * @param  {Int} min Minimum number of words per sentence
 * @param  {Int} max Maximum number of words per sentence
 * @return {Sring}     Sentence generated from lorem ipsum words.
 */
random.lorem_sentence = function(min,max){
	return tools.string.first_letter_caps(random.lorem_words(min,max).join(" "))+".";
};

/**
 * Returns between min and max random companies in an array.
 * @memberof module:getme
 * @param  {Int} min Minimum number of companies to return
 * @param  {Int} max Maximum number of companies to return
 * @return {Array}     Array of company name strings
 */
random.company = function(min,max){
	return random.array.items(languages[lang].company(),min,max);
};

/**
 * Returns a random moment between start and end time
 * @memberof module:getme
 * @param  {*} start Any format that moment.js is able to parse as a starting limit for the random moment
 * @param  {*} end   Any format that moment.js is able to parse as a ending limit for the random moment
 * @return {Moment}       Moment.js formatted time/date
 */
random.moment = function(start,end){
	start = moment(start);
	end = moment(end);
	return moment(start.valueOf() + myRandom() * (end.valueOf() - start.valueOf()));
};

//Internet related randomness
random.internet = require("./random/internet.js");

module.exports = random;