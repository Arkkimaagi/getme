/*global module:false*/
'use strict';


module.exports = function(grunt) {

	// Load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	//Load our own tasks
	grunt.loadTasks('tasks');

//--------------------------------------------------------------------------------------------------

	var conf = {

		// Is this really needed?
		pkg: grunt.file.readJSON('package.json'),

		//Check syntax of JavaScript
		jshint: {
			_watch: {
				gruntfile: '<%=jshint.gruntfile.src%>',
			},
			options: {
				/* JsHint settings, remember to put this to your editor too */
				"bitwise":true, "camelcase":false, "curly":true, "eqeqeq": true, "forin":false,
				"immed": false, "latedef": true, "newcap": true, "noarg": true, "noempty": false,
				"nonew": true, "plusplus":false, "regexp": true, "strict":false, "trailing": true,
				"undef": true, "unused": false, "white":false, /**/ "es5":true, "sub":true, /**/
				"browser": true, "jquery": true
			},
			gruntfile: {src: 'Gruntfile.js'}
		},

		"string-replace": {
			dist: {
				files: {
					"./index.js": "./index.js"
				},
				options: {
					replacements: [{
						pattern: /exports\.version ?= ?"\d+\.\d+\.\d+";/ig,
						replacement: "exports.version = \"<%= pkg.version %>\";"
					}]
				}
			}
		},

		jsdoc: {
			dist: {
				src: ['README.md', 'index.js', 'lib/**/*.js'],
				options: {
					configure: "./jsdoc_settings/conf.json",
					template: "./jsdoc_settings/getmestyle/",
					tutorials: "./tutorials/",
					destination: 'doc'
				}
			}
		},

		list_features: {
			dist: {
				options: {
					prefix: "getme",
				},
				files:{
					"./tutorials/features.md": "./index.js"
				}
			}
		}

	};

//--------------------------------------------------------------------------------------------------

	// Project configuration.
	grunt.initConfig(conf);

	grunt.registerTask('default', [
		'string-replace', 'list_features', 'jsdoc'
	]);

};
