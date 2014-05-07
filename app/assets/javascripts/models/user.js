Soundclown.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  parse: function(jsonResp) {
    var that = this;
    if (jsonResp.tracks) {
      this.tracks().set(jsonResp.tracks);
      this.tracks().each(function(track) {
        track.set("poster", that);
      });
      delete jsonResp.tracks;
    };
    if (jsonResp.playlists) {
      this.playlists().set(jsonResp.playlists);
      this.playlsits().each(function(playlist) {
        playlist.set("creator", that);
      })
      delete jsonResp.playlists;
    };
    if (jsonResp.likes) {
      this.likes().set(jsonResp.likes);
      this.likes().each(function(like) {
        like.set("liker", that);
      })
      delete jsonResp.likes;
    };
    if (jsonResp.reblogs) {
      this.reblogs().set(jsonResp.reblogs);
      this.reblogs().each(function(reblog) {
        reblog.set("reblogger", that);
      })
      delete jsonResp.reblogs;
    };
    if (jsonResp.authoredComments) {
      this.authoredComments().set(jsonResp.authoredComments);
      this.authoredComments().each(function(comment) {
        comment.set("commenter", that);
      })
      delete jsonResp.authoredComments;
    };
    if (jsonResp.notifications) {
      this.notifications().set(jsonResp.notifications);
      this.notifications().each(function(notification) {
        comment.set("user", that);
      });
      delete jsonResp.notifications;
    };
    if (jsonResp.followers) {
      this.followers().set(jsonResp.followers);
      this.followers().each(function(follower) {
        follower.followees().add(that);
      })
      delete jsonResp.followers;
    };
    if (jsonResp.followees) {
      this.followees().set(jsonResp.followees);
      this.followees().each(function(followee) {
        followee.followers().add(that);
      })
      delete jsonResp.followees;
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

  playlists: function() {
    if (!this.get("playlists")) {
      var userPlaylists = new Soundclown.Collections.Playlists([], {
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
      var userLikes = new Soundclown.Collections.Likes([], {
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
      var userReblogs = new Soundclown.Collections.Reblogs([], {
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
      var userCommments = new Soundclown.Collections.Comments([], {
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
      var notifications = new Soundclown.Collections.Notifications([], {
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
      var followers = new Soundclown.Collections.Followers([], {
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
      var followees = new Soundclown.Collections.Followees([], {
        user: this
      });
      this.set({
        followees: followees
      });
    }

    return this.get("followees");
  }

});
