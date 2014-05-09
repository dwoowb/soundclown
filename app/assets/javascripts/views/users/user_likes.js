Soundclown.Views.UserLikes = Backbone.View.extend({
  template: JST["likes/index"],
  className: "user-likes",

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