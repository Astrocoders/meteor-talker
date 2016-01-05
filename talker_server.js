/* jshint esnext: true*/
Meteor.talks = function(name, fn){
  Meteor.publish(`astrocoders_talker/${name}`, function(){
    const talkerId = Random.id();
    const pub = this;
    let talker = fn( talkChange ) || {};

    this.added(TALKER_COLL, talkerId, {
      name,
      changingProp: Random.id(),
    });

    if(talker._publishCursor){
      // There's no direct way to suppress the initial fire of .added hook
      let suppressInitial = true;
      let boundTalkChange = () => {
        if(!suppressInitial) talkChange();
      };

      let observeHandler = talker.observeChanges({
        added: boundTalkChange,
        changed: boundTalkChange,
        remove: boundTalkChange,
        movedBefore: boundTalkChange,
      });

      suppressInitial = false;

      this.onStop(() => observeHandler.stop());
    }

    function talkChange(data = {}){
      check({data}, {data: Object});
      console.log('[astrocoders:talker]', `Talking to ${name}`);
      pub.changed(TALKER_COLL, talkerId, _.extend({
        changingProp: Random.id(),
      }, data));
    }
  });

};
