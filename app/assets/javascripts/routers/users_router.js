Soundclown.Routers.Users = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.$leftbar = options.$leftbar;
    this.$rightbar = options.$rightbar;
  },

  routes: {
    "": "userStream",
    "users/:id": "usersShow",
    "users/:id/edit": "usersEdit",
    "users/:id/followers": "usersFollowers",
    "users/:id/followees": "usersFollowees"
  },

  userStream: function() {
    var that = this;
    var streamView = new Soundclown.Views.UserStream({
      model: Soundclown.currentUser
    });

    this._swapView(this.$rootEl, streamView);
  },

  usersShow: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var showView = new Soundclown.Views.UserShow({
        model: user
      });
      this._swapView(this.$leftbar, user profile);
      this._swapView(this.$rootEl, tracks in the middle);
      this._swapView(this.$rightbar, user stats);
    })

  },

  usersEdit: function() {
    var editView = new Soundclown.Views.UserEdit({
      collection: Soundclown.users,
      model: Soundclown.currentUser
    });
    this._swapView(this.$rootEl, editView);
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
  },

  _swapView: function(domEl, view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    domEl.html(view.render().$el);
  }

});
