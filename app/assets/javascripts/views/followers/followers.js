Soundclown.Views.Followers = Backbone.View.extend({
  template: JST["followers/show"],

  initialize: function(options) {
    this.user = options.user;
    this.follower = options.model;
  },

  render: function() {
    var renderedContent = this.template({
      user: this.user,
      follower: this.follower
    });
    this.$el.html(renderedContent);
    return this;
  }
})