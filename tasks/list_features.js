/*jshint node:true */
/**
 * @fileoverview List Features is an tool to list package features. And currently, it's ugly.
 *
 * @author Mikko Tapionlinna
 */


'use strict';

var path = require('path');

module.exports = function(grunt) {

	var head = "";

	head += "Getme features\n";
	head += "==============\n";
	head += "\n";
	head += "This is an autogenerated feature list for quick reference. "+
					"Please see the Getme documentation for what each command does.\n";
	head += "\n";

	var detectDestType = function(dest) {
			if (grunt.util._.endsWith(dest, '/')) {
				return 'directory';
			} else {
				return 'file';
			}
		};

	var unixifyPath = function(filepath) {
			if (process.platform === 'win32') {
				return filepath.replace(/\\/g, '/');
			} else {
				return filepath;
			}
		};

	var util = require("util");

	function getParamNames(func) {
		var funStr = func.toString();
		return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
	}

	function formatMarkdown(name, details, link){
		return "### [" + name + details + "](module-getme.html#" + link + ")\n";
	}

	function inspect(target,prefix,depth){
		if(depth<=0){
			return "...\n";
		}
		
		var log = "";
		
		for(var i in target){
			
			var output = "";
			var type = typeof target[i];
			
			var name = "";
			var details = "";
			var link = "";
			
			if(util.isArray(target[i])){
				
				name = prefix+i;
				details = " = [ "+target[i].join(", ")+" ]";
				link = name.replace(/getme\./,"");
				output += formatMarkdown(name, details, link);
				
			} else if(type === "string"){
				
				name = prefix+i;
				details = " = \""+target[i]+"\"";
				link = name.replace(/getme\./,"");
				output += formatMarkdown(name, details, link);
				
			} else if(type === "boolean"|| type === "number"){
				
				name = prefix+i;
				details = " = "+target[i];
				link = name.replace(/getme\./,"");
				output += formatMarkdown(name, details, link);
				
			} else if(type === "function"){
				
				var params = getParamNames(target[i]);
				params = (params === null)?"":" "+params.join(", ")+" ";
				name = prefix+i;
				details = "("+params+")";
				link = name.replace(/getme\./,"");
				output += formatMarkdown(name, details, link);
				
			} else if(type === "object"){
				
				output += inspect(target[i],prefix+i+".",depth-1);
				
			}
			log += output;
		}
		return log;
	}

	grunt.registerMultiTask('list_features', 'Lists package features in markdown format', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options();
		
		var dest;
		var isExpandedPair;
		
		this.files.forEach(function(filePair) {
			filePair.src.forEach(function(src) {
				isExpandedPair = filePair.orig.expand || false;

				if (detectDestType(filePair.dest) === 'directory') {
					dest = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, src));
				} else {
					dest = filePair.dest;
				}

				var module = require("../"+src);
				
				var result = head;
				result += inspect(module,options.prefix+".",10);
				grunt.file.write(dest, result);
				grunt.log.writeln("Features listed from "+src+" to "+dest);
			});
		});
		
	});
	
};