Soundclown.Views.UserLikes = Backbone.CompositeView.extend({
  template: JST["users/likes"],

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