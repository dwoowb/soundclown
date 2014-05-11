Soundclown.Views.UserMain = Backbone.View.extend({
  template: JST["users/main"],
  className: "user-main",

  initialize: function(options) {
    this.listenTo(this.model.tracks(), "add remove change", this.render);
    // should also have listeners for user's reblogged items
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