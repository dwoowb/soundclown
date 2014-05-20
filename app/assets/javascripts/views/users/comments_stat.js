Soundclown.Views.UserCommentsStat = Backbone.View.extend({
  template: JST["users/commentsStat"],

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