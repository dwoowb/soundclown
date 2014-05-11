Soundclown.Views.CommentsNew = Backbone.View.extend({
  template: JST["comments/new"],

  render: function() {
    var renderedContent = this.template();

    this.$el.html(renderedContent);
    return this;
  }
})