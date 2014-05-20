Soundclown.Views.UserFollowersStat = Backbone.View.extend({
  template: JST["users/followersStat"],

  initialize: function(options) {
    this.followee = options.followee
  },

  render: function() {
    var renderedContent = this.template({
      followee: this.followee
    });
    this.$el.html(renderedContent);
    return this;
  }

})