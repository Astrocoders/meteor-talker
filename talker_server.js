/* jshint esnext: true*/
Meteor.talks = function(name, fn){
  Meteor.publish(`astrocoders_talker/${name}`, function(){
    const talkerId = Random.id();
    const pub = this;
    let boundTalkChange = talkChange.bind(null, {});
    let talker = fn( talkChange ) || {};

    this.added(TALKER_COLL, talkerId, {
      name,
      changingProp: Random.id(),
    });

    if(talker._publishCursor){
      console.log('Talker is a Mongo cursor, listening to its hooks');
      let observeHandler = talker.observeChanges({
        added: boundTalkChange,
        changed: boundTalkChange,
        remove: boundTalkChange,
      });

      this.onStop(() => observeHandler.stop());
    }

    function talkChange(data = {}){
      check({data}, {data: Object});
      pub.changed(TALKER_COLL, talkerId, _.extend({
        changingProp: Random.id(),
      }, data));
    }
  });

};
