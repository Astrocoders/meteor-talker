/* jshint esnext: true*/
Meteor.talks = function(name, fn){
  Meteor.publish(`astrocoders_talker/${name}`, function(){
    const talkerId = Random.id();
    let boundTalkChange = talkChange.bind(this, talkerId);
    let talker = fn( boundTalkChange );

    this.added(TALKER_COLL, talkerId, {
      name,
      changingProp: Random.id(),
    });

    if(Meteor._get(talker, '_publishCursor')){
      console.log('Talker is a Mongo cursor, listening to its hooks');
      let observeHandler = talker.observeChanges({
        added: boundTalkChange,
        changed: boundTalkChange,
        remove: boundTalkChange,
      });

      this.onStop(() => observeHandler.stop());
    }
  });

};

function talkChange(talkerId){
  this.changed(TALKER_COLL, talkerId, {
    changingProp: Random.id(),
  });
}
