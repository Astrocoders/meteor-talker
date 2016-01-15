AstroTalker
===========
[![Stories in Ready](https://badge.waffle.io/Astrocoders/meteor-talker.svg?label=ready&title=Ready)](http://waffle.io/Astrocoders/meteor-talker)

Reactively re-runs a client code whenever a server condition changes

## Installation
Add it to your project with Meteor packages system
```sh
$ meteor add astrocoders:talker
```

## Why?
Sometimes you want to reactively talks to the client but your needs don't require
creating a new collection nor publications and subscribes.
You may want to notify changes in a collection that your client is already subscribed
to it and you don't want to mess things up (!).

## Usage

```js
// @locus server
Meteor.talks('somethingChanged', function(rerunCb){
  // Call `rerunCb` whenever you want to warn client
  // You can optionally pass an object to rerunCb
  // but must be an object.
  Meteor.setInterval(rerunCb.bind(null, {msg: 'foo'}), 1000);
});
```

```js
// @locus client
let listenerHandler = Meteor.listens('somethingChanged', function(data){
  console.log('got rerun', data.msg);
});

// call whenever you're done with it:
listenerHandler.stop();
```

```js
// @locus server
Meteor.talks('somethingChanged', function(rerunCb){
  // Talker will detects the returning of a cursor and will listen
  // to the cursor changes to warn client.
  return Items.find();
});
```

You can also use within a template instance, and will get stopped when the template
get destroyed:
```js
Template.Foo.onCreated(function(){
  this.foo = new ReactiveVar(0);
  
  this.listens('something', (data) => {
    this.foo.set(data.foo);
  });
});
```
