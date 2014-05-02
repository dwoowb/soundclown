Soundclown.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  parse: function(jsonResp) {
    if (jsonResp.tracks) {
      this.tracks().set(jsonResp.tracks);
      delete jsonResp.tracks;
    }
    if (jsonResp.playlists) {
      this.playlists().set(jsonResp.playlists);
      delete jsonResp.playlists;
    }
    if (jsonResp.likes) {
      this.likes().set(jsonResp.likes);
      delete jsonResp.likes;
    }
    if (jsonResp.reblogs) {
      this.reblogs().set(jsonResp.reblogs);
      delete jsonResp.reblogs;
    }
    if (jsonResp.authored_comments) {
      this.authored_comments().set(jsonResp.authored_comments);
      delete jsonResp.authored_comments;
    }
    if (jsonResp.notifications) {
      this.notifications().set(jsonResp.notifications);
      delete jsonResp.notifications;
    }
    if (jsonResp.followers) {
      this.followers().set(jsonResp.followers);
      delete jsonResp.followers;
    }
    if (jsonResp.followees) {
      this.followees().set(jsonResp.followees);
      delete jsonResp.followees;
    }


    return jsonResp;
  },

  tracks: function() {
    if (!this.get("tracks")) {
      var userTracks = new Soundclown.Collections.UserTracks([], {
        user: this
      });
      this.set({
        tracks: userTracks
      });
    }

    return this.get("tracks");
  }

});
