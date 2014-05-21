Soundclown.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  parse: function(jsonResp) {
    var that = this;
    if (jsonResp.tracks) {
      this.tracks().set(jsonResp.tracks, { parse: true });
      this.tracks().each(function(track) {
        track.set("poster", that);
      });
      delete jsonResp.tracks;
    };
    if (jsonResp.playlists) {
      this.playlists().set(jsonResp.playlists, { parse: true });
      this.playlists().each(function(playlist) {
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
    if (jsonResp.likedTracks) {
      this.likedTracks().set(jsonResp.likedTracks, { parse: true });
      delete jsonResp.likedTracks;
    };
    if (jsonResp.likedPlaylists) {
      this.likedPlaylists().set(jsonResp.likedPlaylists, { parse: true });
      delete jsonResp.likedPlaylists;
    };
    if (jsonResp.reblogs) {
      this.reblogs().set(jsonResp.reblogs);
      this.reblogs().each(function(reblog) {
        reblog.set("reblogger", that);
      })
      delete jsonResp.reblogs;
    };
    if (jsonResp.rebloggedTracks) {
      this.rebloggedTracks().set(jsonResp.rebloggedTracks, { parse: true });
      delete jsonResp.rebloggedTracks;
    };
    if (jsonResp.rebloggedPlaylists) {
      this.rebloggedPlaylists().set(jsonResp.rebloggedPlaylists, { parse: true });
      delete jsonResp.rebloggedPlaylists;
    };
    if (jsonResp.comments) {
      this.comments().set(jsonResp.comments);
      this.comments().each(function(comment) {
        comment.set("commenter", that);
      })
      delete jsonResp.comments;
    };
    if (jsonResp.notifications) {
      this.notifications().set(jsonResp.notifications);
      this.notifications().each(function(notification) {
        notification.set("user", that);
      });
      delete jsonResp.notifications;
    };
    if (jsonResp.inFollows) {
      this.inFollows().set(jsonResp.inFollows);
      this.inFollows().each(function(inFollow) {
        inFollow.set("followee", that);
        inFollow.set("follower", Soundclown.currentUser);
      });
      delete jsonResp.inFollows;
    };
    // if (jsonResp.outFollows) {
    //   this.outFollows().set(jsonResp.outFollows);
    //   this.outFollows().each(function(outFollow) {
    //     outFollows.set("follower", that);
    //   })
    //   delete jsonResp.followees;
    // };
    if (jsonResp.followers) {
      this.followers().set(jsonResp.followers, { parse: true });
      this.followers().each(function(follower) {
        follower.followees().add(that);
      })
      delete jsonResp.followers;
    };
    if (jsonResp.followees) {
      this.followees().set(jsonResp.followees, { parse: true });
      this.followees().each(function(followee) {
        followee.followers().add(that);
      })
      delete jsonResp.followees;
    };
    return jsonResp;
  },

  // I don't think any of these collections need to be passed the user

  tracks: function() {
    if (!this.get("tracks")) {
      var userTracks = new Soundclown.Collections.Tracks([], {});
      this.set({
        tracks: userTracks
      });
    };
    return this.get("tracks");
  },

  playlists: function() {
    if (!this.get("playlists")) {
      var userPlaylists = new Soundclown.Collections.Playlists([], {});
      this.set({
        playlists: userPlaylists
      });
    };
    return this.get("playlists");
  },

  likes: function() {
    if (!this.get("likes")) {
      var userLikes = new Soundclown.Collections.Likes([], {});
      this.set({
        likes: userLikes
      });
    };
    return this.get("likes");
  },

  likedTracks: function() {
    if (!this.get("likedTracks")) {
      var likedTracks = new Soundclown.Collections.Tracks([], {});
      this.set({
        likedTracks: likedTracks
      });
    };
    return this.get("likedTracks");
  },

  likedPlaylists: function() {
    if (!this.get("likedPlaylists")) {
      var likedPlaylists = new Soundclown.Collections.Playlists([], { });
      this.set({
        likedPlaylists: likedPlaylists
      });
    };
    return this.get("likedPlaylists");
  },

  reblogs: function() {
    if (!this.get("reblogs")) {
      var userReblogs = new Soundclown.Collections.Reblogs([], {});
      this.set({
        reblogs: userReblogs
      });
    };
    return this.get("reblogs");
  },

  rebloggedTracks: function() {
    if (!this.get("rebloggedTracks")) {
      var rebloggedTracks = new Soundclown.Collections.Tracks([], {});
      this.set({
        rebloggedTracks: rebloggedTracks
      });
    };
    return this.get("rebloggedTracks");
  },

  rebloggedPlaylists: function() {
    if (!this.get("rebloggedPlaylists")) {
      var rebloggedPlaylists = new Soundclown.Collections.Playlists([], {});
      this.set({
        rebloggedPlaylists: rebloggedPlaylists
      });
    };
    return this.get("rebloggedPlaylists");
  },

  comments: function() {
    if (!this.get("comments")) {
      var userComments = new Soundclown.Collections.Comments([], {});
      this.set({
        comments: userComments
      });
    };
    return this.get("comments");
  },

  notifications: function() {
    if (!this.get("notifications")) {
      var notifications = new Soundclown.Collections.Notifications([], {});
      this.set({
        notifications: notifications
      });
    };
    return this.get("notifications");
  },

  inFollows: function() {
    if (!this.get("inFollows")) {
      var inFollows = new Soundclown.Collections.Follows([], {});
      this.set({
        inFollows: inFollows
      });
    };
    return this.get("inFollows");
  },
  // outFollows: function() {
  //   if (!this.get("outFollows")) {
  //     var outFollows = new Soundclown.Collections.Follows([], {});
  //     this.set({
  //       outFollows: outFollows
  //     });
  //   };
  //   return this.get("outFollows");
  // },
  followers: function() {
    if (!this.get("followers")) {
      var followers = new Soundclown.Collections.Users([], {});
      this.set({
        followers: followers
      });
    };
    return this.get("followers");
  },
  followees: function() {
    if (!this.get("followees")) {
      var followees = new Soundclown.Collections.Users([], {});
      this.set({
        followees: followees
      });
    }
    return this.get("followees");
  }

});
