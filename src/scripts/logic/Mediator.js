define([''], function () {
  /*
   url: http://carldanley.com/js-mediator-pattern/
   Mediator.subscribe( 'some event', Subscriber );
   Mediator.publish( 'some event', 'foo bar' ); // console logs "foo bar"
   */
  topics = {};

  function subscribe( topic, callback ) {
    if( ! topics.hasOwnProperty( topic ) ) {
      topics[ topic ] = [];
    }

    topics[ topic ].push( callback );
    return true;
  };

  function unsubscrive( topic, callback ) {
    if( ! topics.hasOwnProperty( topic ) ) {
      return false;
    }
    for( var i = 0, len = topics[ topic ].length; i < len; i++ ) {
      // Do string comparison because you cannot compare functions.
      if( String(topics[ topic ][ i ]) === String(callback) ) {
        topics[ topic ].splice( i, 1 );
        return true;
      }
    }
    return false;
  };

  function publish() {
    var args = Array.prototype.slice.call( arguments );
    var topic = args.shift();

    if( ! topics.hasOwnProperty( topic ) ) {
      return false;
    }

    for( var i = 0, len = topics[ topic ].length; i < len; i++ ) {
      topics[ topic ][ i ].apply( undefined, args );
    }
    return true;
  };

  return {
    subscribe: subscribe,
    unsubscrive: unsubscrive,
    publish: publish,
    topics: topics
  };
});