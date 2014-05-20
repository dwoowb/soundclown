Soundclown.Views.TracksNew = Backbone.View.extend({
  template: JST["tracks/new"],

  events: {
    "submit form": "submit"
  },

  initialize: function(options) {
    this.user = options.model;
  },

  submit: function(event) {
    event.preventDefault();
  },

  render: function() {
    var renderedContent = this.template({
      user: this.user
    });
    this.$el.html(renderedContent);
    return this;
  }
})