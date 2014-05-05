Soundclown.Routers.Users = Backbone.Router.extend({
  initialize: function(options) {
  },

  routes: {
    "": "userStream",
    "users/:id": "usersShow",
    "users/:id/edit": "usersEdit",
    "users/:id/followers": "usersFollowers",
    "users/:id/followees": "usersFollowees",
    "users/:id/playlists": "usersPlaylists",
    "users/:id/likes": "usersLikes",
    "users/:id/comments": "usersComments",
    "users/:id/tracks": "usersTracks",
  },

  userStream: function() {
    var that = this;
    var streamView = new Soundclown.Views.UserStream({
      model: Soundclown.currentUser
    });

    Soundclown._swapView("rootEl", streamView);
  },

  usersShow: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var mainView = new Soundclown.Views.UserMain({
        model: user
      });
      // Soundclown._swapView(leftbar, profileView);
      Soundclown._swapView("rootEl", mainView);
      // Soundclown._swapView(rightbar, statsView);
    })

  },

  usersEdit: function(id) {
    // doesn't use id but... whatever
    var editView = new Soundclown.Views.UserEdit({
      collection: Soundclown.users,
      model: Soundclown.currentUser
    });
    Soundclown._swapView("rootEl", editView);
  },

  // these are going to require leftbars
  // they should also all render the mini nav, in the rootEl perhaps?

  usersTracks: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var tracksView = new Soundclown.Views.UserTracks({
        model: user,
        collection: user.tracks()
      });
      Soundclown._swapView("rootEl", tracksView);
    })
  },

  usersPlaylists: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var playlistsView = new Soundclown.Views.UserPlaylists({
        model: user,
        collection: user.playlists()
      });
      Soundclown._swapView("rootEl", playlistsView);
    })
  },

  usersLikes: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var likesView = new Soundclown.Views.UserLikes({
        model: user,
        collection: user.likes()
      });
      Soundclown._swapView("rootEl", likesView);
    })
  },

  usersComments: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var commentsView = new Soundclown.Views.UserComments({
        model: user,
        collection: user.authoredComments()
      });
      Soundclown._swapView("rootEl", commentsView);
    })
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
