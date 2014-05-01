Soundclown.Routers.Users = Backbone.Router.extend({
  initialize: function(options) {
    this.users = options.users;
    // this.current_user = options.current_user;
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "userStream", //really only for current_user
    "users/new": "usersNew", //current_user
    "users/:id": "usersShow", //any user
    "users/:id/edit": "usersEdit", //current_user
    "users/:id/followers": "usersFollowers", //any user
    "users/:id/followees": "usersFollowees" //any user
  },

  userStream: function() {

  },

  usersNew: function() {
    var newUser = new Soundclown.Models.User();
    var newView = new Soundclown.Views.UserNew({
      collection: this.users,
      model: newUser
    });

    this._swapView(newView);
  },

  usersShow: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var showView = new Soundclown.Views.UserShow({
        model: user
      });
      that._swapView(showView);
    })
  },

  usersEdit: function(id) {
    var that = this;
    this._getUser(id, function(user) {
      var editView = new Soundclown.Views.UserEdit({
        collection: this.users,
        model: user
      });
      that._swapView(editView);
    })
  },

  _getUser: function(id, callback) {
    var that = this;
    var user = Soundclown.users.get(id);
    if(!user) {
      user = new Soundclown.Models.User({
        id: id
      });
      user.collection = this.users;
      user.fetch({
        success: function() {
          that.users.add(user);
          callback(user);
        }
      });
    } else {
      callback(user)
    }
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
