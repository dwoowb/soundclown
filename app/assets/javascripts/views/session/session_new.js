Soundclown.Views.UserNew = Backbone.View.extend({
  template: JST["session/new"],
  className: "session-new",

  initialize: function(options) {

  },

  events: {
    "submit form": "submit"
  },

  render: function() {
    var renderedContent = this.template();

    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON()["user"];
    var newUser = new Soundclown.Models.User(params);

    newUser.save({}, {
      success: function() {
        Soundclown.Collections.Users.add(newUser);
        // should this be a lowercase `users`?
        // render user show page
      }
    })
  }
})