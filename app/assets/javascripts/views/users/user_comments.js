Soundclown.Views.UserComments = Backbone.View.extend({
  template: JST["comments/index"],
  className: "user-comments",

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