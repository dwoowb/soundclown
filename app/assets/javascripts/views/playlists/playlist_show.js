Soundclown.Views.PlaylistShow = Backbone.View.extend({
  template: JST['playlists/show'],

  initialize: function(options) {
    this.playlist = options.model
  },

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      playlist: this.playlist
    });
    this.$el.html(renderedContent);
    return this;
  }



});
