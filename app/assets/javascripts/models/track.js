Soundclown.Models.Track = Backbone.Model.extend({
  urlRoot: "/api/tracks",

  parse: function(jsonResp) {
    var that = this;
    if (jsonResp.playlistTracks) {
      this.playlistTracks().set(jsonResp.playlistTracks);
      this.playlistTracks().each(function(playlistTrack) {
        playlistTrack.set("track", that);
      });
      delete jsonResp.playlistTracks;
    };
    if (jsonResp.comments) {
      this.comments().set(jsonResp.comments);
      this.comments().each(function(comment) {
        comment.set("track", that);
      });
      delete jsonResp.comments;
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

  playlistTracks: function() {
    if (!this.get("playlistTracks")) {
      var playlistTracks = new Soundclown.Collections.PlaylistTracks([], {});
      this.set({
        playlistTracks: playlistTracks
      });
    };
    return this.get("playlistTracks");
  },

  comments: function() {
    if (!this.get("comments")) {
      var trackComments = new Soundclown.Collections.Comments([], {});
      this.set({
        comments: trackComments
      });
    };
    return this.get("comments");
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
