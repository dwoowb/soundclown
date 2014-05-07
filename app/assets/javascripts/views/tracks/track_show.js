Soundclown.Views.TrackShow = Backbone.View.extend({
  template: JST['tracks/show'],

  initialize: function(options) {
    this.track = options.model
  },

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      track: this.track
    });
    this.$el.html(renderedContent);
    return this;
  }



});
