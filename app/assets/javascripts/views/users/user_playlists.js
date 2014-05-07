Soundclown.Views.UserPlaylists = Backbone.View.extend({
  template: JST["users/playlists"],
  className: "user-playlists",

  initialize: function(options) {
    this.user = options.model
  },

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      user: this.user
    });
    this.$el.html(renderedContent);
    return this;
  }

})