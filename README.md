AstroTalker
===========

Reactively re-runs a client code whenever a server condition changes

## Installation
Add it to your project with Meteor packages system
```sh
$ meteor add astrocoders:talker
```

## Usage

```js
// @locus server
Meteor.talks('somethingChanged', function(rerunCb){
  // Call `rerunCb` whenever you want to warn client
  Meteor.setInterval(rerunCb, 1000);
});
```

```js
// @locus client
Meteor.listens('somethingChanged', function(){
  console.log('got rerun');
});
```

```js
// @locus server
Meteor.talks('somethingChanged', function(rerunCb){
  // Talker will detects the returning of a cursor and will listen
  // to the cursor changes to warn client.
  return Items.find();
});
```
