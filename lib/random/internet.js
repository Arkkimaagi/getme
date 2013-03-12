/*jshint node:true */
var _random = require("../random.js");
var random = {};
random.internet = module.exports;

/**
 * Random ip address
 * @memberof module:getme
 * @return {String} Randomly generated ip address
 */
random.internet.ip = function(){
	return [
		_random.between(1,256),
		_random.between(1,256),
		_random.between(1,256),
		_random.between(1,256)
		].join(".");
};