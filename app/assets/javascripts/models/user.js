Soundclown.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  // still needs authored_comments, followers, followees

  tracks: function() {
    if (!this._tracks) {
      this._tracks = new User.Collections.Tracks([], {
        user: this
      });
    }

    return this._tracks;
  },

  playlists: function() {
    if (!this._playlists) {
      this._playlists = new User.Collections.Playlists([], {
        user: this
      });
    }

    return this._playlists;
  },

  likes: function() {
    if (!this._likes) {
      this._likes = new User.Collections.Likes([], {
        user: this
      });
    }

    return this._likes;
  },

  reblogs: function() {
    if (!this._reblogs) {
      this._reblogs = new User.Collections.Reblogs([], {
        user: this
      });
    }

    return this._reblogs;
  },

  authored_comments: function() {
    if (!this._authored_comments) {
      this._authored_comments = new User.Collections.AuthoredComments([], {
        user: this
      });
    }

    return this._authored_comments;
  },

  notifications: function() {
    if (!this._notifications) {
      this._notifications = new User.Collections.Notifications([], {
        user: this
      });
    }

    return this._notifications;
  },

  followers: function() {
    if (!this._followers) {
      this._followers = new User.Collections.Followers([], {
        user: this
      });
    }

    return this._followers;
  },

  followees: function() {
    if (!this._followees) {
      this._followees = new User.Collections.Followees([], {
        user: this
      });
    }

    return this._followees;
  },

  parse: function(jsonResp) {
    if (jsonResp.tracks) {
      this.tracks().set(jsonResp.tracks);
      delete jsonResp.tracks;
    }
    else if (jsonResp.playlists) {
      this.playlists().set(jsonResp.playlists);
      delete jsonResp.playlists;
    }
    else if (jsonResp.likes) {
      this.likes().set(jsonResp.likes);
      delete jsonResp.likes;
    }
    else if (jsonResp.reblogs) {
      this.reblogs().set(jsonResp.reblogs);
      delete jsonResp.reblogs;
    }
    else if (jsonResp.authored_comments) {
      this.authored_comments().set(jsonResp.authored_comments);
      delete jsonResp.authored_comments;
    }
    else if (jsonResp.notifications) {
      this.notifications().set(jsonResp.notifications);
      delete jsonResp.notifications;
    }
    else if (jsonResp.followers) {
      this.followers().set(jsonResp.followers);
      delete jsonResp.followers;
    }
    else if (jsonResp.followees) {
      this.followees().set(jsonResp.followees);
      delete jsonResp.followees;
    }


    return jsonResp;
  }
});
