Soundclown.Views.UserStream = Backbone.View.extend({
  template: JST["users/stream"],
  className: "user-stream",

  initialize: function(options) {
    this.user = options.model
  },

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      user: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }

})