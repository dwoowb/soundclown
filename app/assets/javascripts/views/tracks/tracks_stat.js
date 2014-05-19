Soundclown.Views.TracksStat = Backbone.View.extend({
  template: JST["tracks/stat"],

  initialize: function(options) {
    this.user = options.user
  },

  render: function() {
    var renderedContent = this.template({
      user: this.user
    });
    this.$el.html(renderedContent);
    return this;
  }

})