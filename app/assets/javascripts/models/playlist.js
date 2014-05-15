Soundclown.Models.Playlist = Backbone.Model.extend({
  urlRoot: "/playlists",

  parse: function(jsonResp) {
    var that = this;
    if (jsonResp.tracks) {
      this.tracks().set(jsonResp.tracks, { parse: true });
      this.tracks().each(function(track) {
        track.set("poster", that);
      });
      delete jsonResp.tracks;
    };
    if (jsonResp.likes) {
      this.likes().set(jsonResp.likes);
      this.likes().each(function(like) {
        like.set("track", that);
      });
      delete jsonResp.likes;
    };
    if (jsonResp.reblogs) {
      this.reblogs().set(jsonResp.reblogs);
      this.reblogs().each(function(reblog) {
        reblog.set("track", that);
      });
      delete jsonResp.reblogs;
    };

    return jsonResp;
  },

  tracks: function() {
    if (!this.get("tracks")) {
      var userTracks = new Soundclown.Collections.Tracks([], {
        user: this
      });
      this.set({
        tracks: userTracks
      });
    }

    return this.get("tracks");
  },

  likes: function() {
    if(!this.get("likes")) {
      var trackLikes = new Soundclown.Collections.Likes([], {});
      this.set({
        likes: trackLikes
      });
    };
    return this.get("likes");
  },

  reblogs: function() {
    if(!this.get("reblogs")) {
      var trackReblogs = new Soundclown.Collections.Reblogs([], {});
      this.set({
        reblogs: trackReblogs
      });
    };
    return this.get("reblogs");
  }


});
