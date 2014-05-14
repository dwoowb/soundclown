Soundclown.Views.CommentsStat = Backbone.View.extend({
  template: JST["comments/stat"],

  initialize: function(options) {
    this.track = options.track
  },

  render: function() {
    var renderedContent = this.template({
      track: this.track
    });
    this.$el.html(renderedContent);
    return this;
  }

})