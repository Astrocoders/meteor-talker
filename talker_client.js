/* jshint esnext: true */

let AstroTalkerCol = new Mongo.Collection(TALKER_COLL);

Meteor.listens = function(name, fn){
  check({
    name,
    fn,
  }, {
    name: String,
    fn: Function,
  });

  let subHandler = Meteor.subscribe(`astrocoders_talker/${name}`);

  let computation = Tracker.autorun(function(){
    let doc = AstroTalkerCol.findOne({name});

    fn( _.omit(doc, '_id', 'changingProp', 'name') );
  });

  return {
    stop(){
      subHandler.stop();
      computation.stop();
    },
  };
};
