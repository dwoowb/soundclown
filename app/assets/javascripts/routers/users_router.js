Soundclown.Routers.Users = Backbone.Router.extend({
  initialize: function(options) {
  },

  routes: {
    "": "userStream",
    "api/users/:id": "usersShow",
    "api/users/:id/edit": "usersEdit",
    "api/users/:id/followers": "usersFollowers",
    "api/users/:id/followees": "usersFollowees",
    "api/users/:id/playlists": "usersPlaylists",
    "api/users/:id/likes": "usersLikes",
    "api/users/:id/comments": "usersComments",
    "api/users/:id/tracks": "usersTracks",
    "api/users/:id/tracks/new": "tracksNew"
  },

  userStream: function() {
    var that = this;
    var streamView = new Soundclown.Views.UserStream({});

    Soundclown._swapView("rootEl", streamView);
  },

  usersShow: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var showView = new Soundclown.Views.UserShow({
        model: user
      });
			Soundclown._swapView("rootEl", showView);
    });
  },

  usersEdit: function(id) {
    // doesn't use id but... whatever
    var editView = new Soundclown.Views.UserEdit({
      model: Soundclown.currentUser
    });
    Soundclown._swapView("rootEl", editView);
  },

  usersFollowers: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var followersView = new Soundclown.Views.UserFollowers({
        model: user
      });
      Soundclown._swapView("rootEl", followersView);
    });
  },

  usersFollowees: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var followeesView = new Soundclown.Views.UserFollowees({
        model: user
      });
      Soundclown._swapView("rootEl", followeesView);
    });
  },

  usersPlaylists: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var playlistsView = new Soundclown.Views.UserPlaylists({
        model: user
      });
      Soundclown._swapView("rootEl", playlistsView);
    })
  },

  usersLikes: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var likesView = new Soundclown.Views.UserLikes({
        model: user
      });
      Soundclown._swapView("rootEl", likesView);
    })
  },

  usersComments: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var commentsView = new Soundclown.Views.UserComments({
        model: user
      });
      Soundclown._swapView("rootEl", commentsView);
    })
  },

  usersTracks: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var tracksView = new Soundclown.Views.UserTracks({
        model: user
      });
      Soundclown._swapView("rootEl", tracksView);
    });
  },

  tracksNew: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var newTracksView = new Soundclown.Views.TracksNew({
        model: user
      });
      Soundclown._swapView("rootEl", newTracksView);
    });
  },

  _getUser: function(id, callback) {
    var that = this;
    var user = Soundclown.users.get(id);
    if(!user) {
      user = new Soundclown.Models.User({
        id: id
      });
      user.fetch({
        success: function() {
          Soundclown.users.add(user);
          callback(user);
        }
      });
    } else {
      callback(user)
    }
  }

});
