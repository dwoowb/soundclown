Soundclown.Views.UserShow = Backbone.View.extend({
  template: JST["users/show"],
  className: "user-show",

  initialize: function(options) {
    this.listenTo(this.model.tracks(), "add", this.render);
    console.log(this.model.tracks())
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