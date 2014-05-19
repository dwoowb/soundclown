Soundclown.Views.FollowersStat = Backbone.View.extend({
  template: JST["followers/stat"],

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