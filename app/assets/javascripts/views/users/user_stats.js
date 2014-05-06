Soundclown.Views.UserStats = Backbone.View.extend({
  template: JST["users/stats"],
  className: "user-stats",

  initialize: function(options) {
    this.listenTo(this.model, "add remove change", this.render);
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