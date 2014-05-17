Soundclown.Models.Playlist = Backbone.Model.extend({
  urlRoot: "/playlists",

  parse: function(jsonResp) {
    var that = this;
    if (jsonResp.playlistTracks) {
      this.playlistTracks().set(jsonResp.playlistTracks);
      this.playlistTracks().each(function(playlistTrack) {
        playlistTrack.set("playlist", that);
      });
      delete jsonResp.playlistTracks;
    };
    if (jsonResp.tracks) {
      this.tracks().set(jsonResp.tracks, { parse: true });
      // this.tracks().each(function(track) {
//         track.playlistTracks().each(function(playlistTrack) {
//           playlistTrack.set({ playlist_id, that.id });
//         });
//       });
      delete jsonResp.tracks;
    };
    if (jsonResp.likes) {
      this.likes().set(jsonResp.likes);
      this.likes().each(function(like) {
        like.set("playlist", that);
      });
      delete jsonResp.likes;
    };
    if (jsonResp.reblogs) {
      this.reblogs().set(jsonResp.reblogs);
      this.reblogs().each(function(reblog) {
        reblog.set("playlist", that);
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

  tracks: function() {
    if (!this.get("tracks")) {
      var tracks = new Soundclown.Collections.Tracks([], {});
      this.set({
        tracks: tracks
      });
    };
    return this.get("tracks");
  },

  likes: function() {
    if(!this.get("likes")) {
      var playlistLikes = new Soundclown.Collections.Likes([], {});
      this.set({
        likes: playlistLikes
      });
    };
    return this.get("likes");
  },

  reblogs: function() {
    if(!this.get("reblogs")) {
      var playlistReblogs = new Soundclown.Collections.Reblogs([], {});
      this.set({
        reblogs: playlistReblogs
      });
    };
    return this.get("reblogs");
  }


});
