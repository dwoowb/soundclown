Soundclown.Views.UserTracks = Backbone.View.extend({
  template: JST["users/tracks"],
  className: "user-tracks",

  initialize: function(options) {
    this.user = options.model
    this.tracks = options.collection
  },

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      user: this.model,
      tracks: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  }

})