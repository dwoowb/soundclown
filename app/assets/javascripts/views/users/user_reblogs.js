Soundclown.Views.UserReblogs = Backbone.View.extend({
  template: JST["reblogs/index"],
  className: "user-reblogs",

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