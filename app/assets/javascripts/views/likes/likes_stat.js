Soundclown.Views.LikesStat = Backbone.View.extend({
  template: JST["likes/stat"],

  initialize: function(options) {
    this.likedItem = options.likedItem
  },

  render: function() {
    var renderedContent = this.template({
      likedItem: this.likedItem
    });
    this.$el.html(renderedContent);
    return this;
  }

})