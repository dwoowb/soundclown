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
      
      var profileView = new Soundclown.Views.UserProfile({
        model: user
      });
      // 
      // var statsView = new Soundclown.Views.UserStats({
      //   model: user
      // });

      Soundclown._swapView("leftbar", profileView);
			Soundclown._swapView("rootEl", mainView);
      // Soundclown._swapView("rightbar", statsView);
    });
  },

  usersEdit: function(id) {
    // doesn't use id but... whatever
    var editView = new Soundclown.Views.UserEdit({
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
        model: user
      });
      Soundclown._swapView("rootEl", tracksView);
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
