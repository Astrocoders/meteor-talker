/* jshint esnext: true */

let AstroTalkerCol = new Mongo.Collection(TALKER_COLL);

Meteor.listens = function(name, fn){
  let subHandler = Meteor.subscribe(`astrocoders_talker/${name}`);

  let computation = Tracker.autorun(function(){
    AstroTalkerCol.findOne({name});

    fn();
  });

  return {
    stop(){
      subHandler.stop();
      computation.stop();
    },
  };
};
