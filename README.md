Getme: A Nonsense Generator
===========================

Getme was built for my prototyping needs on my free time. It helps generating random stuff for my prototyping projects.
Language support is on the plan, as I need to prototype both in Finnish and English.

Getme currently supports only node.js, but I might add support for browsers at some point. I use Getme together with Mustache templates to generate static html pages.

**Please notice that this project is in early stage and things might change without a warning until we reach version 1.0.0 .**

## Basics

Take a look at the structure to see yourself:
```js
var item = getme.random.array.item(myArray);
```
The aim is to be able to read out loud what you're trying to do: "Get me a random array item from `myArray`."

## Example

Here's a basic example on how it works.
```js
var getme = require('getme');
var myRandom = getme.random.between(1,5);
```

`myRandom` now contains a random integer between 1 and 5. Because it's inclusive, you may get any of the values: `1`, `2`, `3`, `4` or `5`.

### Seeded random

Getme also has support for seeded random, meaning that you can get predictable "random" results when needed.
Lets see how this works as we continue our example.

```js
//This needs to be set only once
getme.random.use_seed = true; //Default is false

//Lets set the seed for our randomness
getme.random.set_seed(9999999);

//Then, lets use getme's functions to get some "random" stuff
console.log(getme.random.between(1,5)); //Always prints 2
console.log(getme.random.between(1,5)); //Always prints 4
console.log(getme.random.between(1,5)); //Always prints 3

// As you can see, we get predictable results. If we now reset the seed, we can start the sequence again.
getme.random.set_seed(9999999);
console.log(getme.random.between(1,5)); //Always prints 2
console.log(getme.random.between(1,5)); //Always prints 4
console.log(getme.random.between(1,5)); //Always prints 3
```
This way we can get random looking results that do not change on each build. With numbers this may seem trivial, but as Getme supports seeded random on everything it does, this becomes more useful.

## Install

You can clone the repo to your machine, and then install the dependencies with:
```
npm install --production
```
If you wish, you can get the whole environment by dropping the `--production` -part out.

## Documentation

The documentation is currently handled by automatically generated html files that can be found in the "doc" folder.

## Support / Contributing
If you wish, you can make a pull request or issue.

You can find me at [@tapionlinna](https://twitter.com/Tapionlinna).

## Versioning

Getme follows [Semantic Versioning](http://semver.org/) rules on it's release versioning.

### Licence

Getme is currently under MIT Licence. Please see the enclosed file.

### Milestones

Following features are planned before 1.0.0 release:

* Examples of using Getme together with templates
	* Maybe some sample templates too like html, csv, json, sql
* Language support
* Instructions on how to create language support for more languages
* Finetuned Grunt.js build process
* Generated data:
	* Phonenumbers
	* Addresses
	* Grouped details for people, companies.
	* Generating company names (instead of the original list approach)
	* IP addresses
	* Domain names
	* Emails
	* Geolocations
	* Catch phrase
	* Mumbo Jumbo sentences
	* Passwords
	* Money

Whew, plenty of stuff to do... :-/

## Release History

#### 2013-03-12 - v0.2.0
* Added getme.random.number()
* Added support for random.internet.ip()
* Added automated documentation about all the module features.
* Fixed a major bug (moment.js was missing from dep, doh)

#### 2013-03-12 - v0.1.0
* Initial release
