Soundclown.Views.UserFollowings = Backbone.CompositeView.extend({
  template: JST["users/followees"],

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