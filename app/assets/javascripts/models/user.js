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
    if (jsonResp.authoredComments) {
      this.authoredComments().set(jsonResp.authoredComments);
      delete jsonResp.authoredComments;
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
  },

  playlists: function() {
    if (!this.get("playlists")) {
      var userPlaylists = new Soundclown.Collections.UserPlaylists([], {
        user: this
      });
      this.set({
        playlists: userPlaylists
      });
    }

    return this.get("playlists");
  },

  likes: function() {
    if (!this.get("likes")) {
      var userLikes = new Soundclown.Collections.UserLikes([], {
        user: this
      });
      this.set({
        likes: userLikes
      });
    }

    return this.get("likes");
  },

  reblogs: function() {
    if (!this.get("reblogs")) {
      var userReblogs = new Soundclown.Collections.UserReblogs([], {
        user: this
      });
      this.set({
        reblogs: userReblogs
      });
    }

    return this.get("reblogs");
  },

  authoredComments: function() {
    if (!this.get("authoredComments")) {
      var userCommments = new Soundclown.Collections.UserComments([], {
        user: this
      });
      this.set({
        authoredComments: userComments
      });
    }

    return this.get("authoredComments");
  },

  notifications: function() {
    if (!this.get("notifications")) {
      var notifications = new Soundclown.Collections.UserNotifications([], {
        user: this
      });
      this.set({
        notifications: notifications
      });
    }

    return this.get("notifications");
  },

  followers: function() {
    if (!this.get("followers")) {
      var followers = new Soundclown.Collections.UserFollowers([], {
        user: this
      });
      this.set({
        followers: followers
      });
    }

    return this.get("followers");
  },

  followees: function() {
    if (!this.get("followees")) {
      var followees = new Soundclown.Collections.UserFollowees([], {
        user: this
      });
      this.set({
        followees: followees
      });
    }

    return this.get("followees");
  }

});
