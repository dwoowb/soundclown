window.Soundclown = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.users = new Soundclown.Collections.Users();
    this.users.fetch({
      success: function () {
        new Soundclown.Routers.Users({
          $rootEl: $("#content"),
          users: Soundclown.users
          // current_user:
        });
        Backbone.history.start();
      }
    });
  }
};