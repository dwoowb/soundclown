Soundclown.Views.Followees = Backbone.View.extend({
  template: JST["followees/show"],

  initialize: function(options) {
    this.user = options.user
    this.followee = options.model
  },

  render: function() {
    var renderedContent = this.template({
      user: this.user
      followee: this.followee
    });
    this.$el.html(renderedContent);
    return this;
  }
})