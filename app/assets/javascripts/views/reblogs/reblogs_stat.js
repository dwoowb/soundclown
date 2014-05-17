Soundclown.Views.ReblogsStat = Backbone.View.extend({
  template: JST["reblogs/stat"],

  initialize: function(options) {
    this.rebloggedItem = options.rebloggedItem
  },

  render: function() {
    var renderedContent = this.template({
      rebloggedItem: this.rebloggedItem
    });
    this.$el.html(renderedContent);
    return this;
  }

})