Tutorial on using seeded random
================================

This document aims to help you understand how seeded random in Getme works and why it can be handy.

Background
----------

Understanding seeded random of Getme can be tricky. Usually when people generate made up data with generators, the data is random each time. I use getme to generate mockup data for prototype sites made with Mustache templates. The names of sample companies, sample people and such will change on each time the site is generated. 

This can be a good thing as then you might spot some problems with too long or too short names. But generally it can be a bit disorienting. There might not be a way to quickly see "that long list of names" if the amounts of names are randomly generated.

So, how does seeded random solve this problem? Well, with seeded random you still get random looking results, but you get the same random results each time. 

It's like tossing a coin hundreds of times, writing the results down and then using the same list of predictable heads or tails over and over again. So, instead of having a different result each round, you'd know what to expect, but for an outsider your list of heads and tails would look random.

## Usage

First things first, from here onwards I assume that you have added getme to your code like this:

```js
var getme = require('getme');
```

If you chose to use some other variable name, just replace the `getme` with what ever you use in the following examples.

### Enabling seeded random in Getme

By default Getme uses standard `Math.random()` function and it's quite random. :) To change this, we need to tell Getme to use seed as follows.

```js
getme.random.use_seed = true;
```

As long as this value is true, all random values returned by Getme are obeying the seeded random ruleset.

### Setting the seed for random in Getme

You're not required to set the seed value if you do not want to. You can continue using Getme as if nothing would have changed. The randomness is cut down quite a bit as the `use_seed` flag is on.

Lets say for now that you want to set the seed yourself. Do it like this.

```js
getme.random.set_seed(1234);
```

You can use your own integer you wish for your seed value. After setting the seed, you can use Getme functions normally.

### Example

```js
getme.random.use_seed = true;

//A little help with printing
function myFunction(value){
	console.log("My value: "+value);
}

//Here's the array to choose items from.
var myArray = ['Apples','Oranges','Bananas','Strawberries','Mangoes'];

console.log("First round:");
getme.random.set_seed(1234); //Lets set the seed value to something we can remember
myFunction(getme.random.array.item(myArray));
myFunction(getme.random.array.item(myArray));
myFunction(getme.random.array.item(myArray));

console.log("Second round:");
getme.random.set_seed(1234); //Setting the seed value again should give same results
myFunction(getme.random.array.item(myArray));
myFunction(getme.random.array.item(myArray));
myFunction(getme.random.array.item(myArray));
```
This will always print the same results in same order:
```
First round:
My value: Apples
My value: Oranges
My value: Bananas
Second round:
My value: Apples
My value: Oranges
My value: Bananas
```
Lets imagine that you wish to print random values to two different pages. You could print the "First round" values on page 1 and "Second round" values on page 2. This way you can have the "same randomness" on each page easily.

## Potential problems

Lets use the same example and modify it a bit.

```js
getme.random.use_seed = true;

//A little help with printing
function myFunction(value){
	console.log("My value: "+value);
}

//Here's the array to choose items from.
var myArray = ['Apples','Oranges','Bananas','Strawberries','Mangoes'];

console.log("First round:");
getme.random.set_seed(1234); //Lets set the seed value to something we can remember
myFunction(getme.random.array.item(myArray));
myFunction(getme.random.array.item(myArray));
myFunction(getme.random.array.item(myArray));

console.log("Second round:");
getme.random.set_seed(1234); //Setting the seed value again should give same results
myFunction(getme.random.array.item(myArray));
var myNumber = getme.random.between(1,5);
myFunction(getme.random.array.item(myArray));
myFunction(getme.random.array.item(myArray));
```
Now the output would be:
```
First round:
My value: Apples
My value: Oranges
My value: Bananas
Second round:
My value: Apples
My value: Bananas
My value: Mangoes
```
What happened here? Why did the last two values change?

The seeded random always returns a new random number when it's used. The added row for "myNumber" asked a new random number in different order than before. That number would have been used to return "Oranges". The next random number was used instead and we got the "Bananas" because of this. "Mangoes" was the next random looking number from our seed.

So any change to the order of seeded randoms used will cause the following randoms to change too. To battle this, you can set the seed as often as you feel necessary.

For example, if you have a big dataset that you are generating, it may be a good idea to set a new seed (it does not have to be a new seed number, just set it) every now and then.

## Which functions support seeded random in Getme?

Everything in Getme that has randomness in it will use seeded random based on these rules. Basicly all functions under `getme.random`. Just remember that if you set the parameters so that no randomness is involved, you'll get no randomness. Like setting `getme.random.between(2,2)` will always return `2`  with `use_seed` set to `true` or `false.