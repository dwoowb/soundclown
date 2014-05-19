Soundclown.Views.UserProfile = Backbone.View.extend({
  template: JST["users/profile"],
  className: "user-profile",

  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);
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