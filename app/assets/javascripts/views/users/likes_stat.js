Soundclown.Views.UserLikesStat = Backbone.View.extend({
  template: JST["users/likesStat"],

  initialize: function(options) {
    this.user = options.user
  },

  render: function() {
    var renderedContent = this.template({
      user: this.user
    });
    this.$el.html(renderedContent);
    return this;
  }

})