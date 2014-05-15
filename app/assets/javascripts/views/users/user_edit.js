Soundclown.Views.UserEdit = Backbone.View.extend({
  template: JST["users/edit"],
  className: "user-edit",

  initialize: function(options) {

  },

  events: {
    "submit form": "submit"
  },

  render: function() {
    var renderedContent = this.template({
      user: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event) {
      event.preventDefault();

      var params = $(event.currentTarget).serializeJSON()["user"];
      var editedUser = new Soundclown.Models.User(params);

      editedUser.update({}, {
        success: function() {
          Soundclown.Collections.Users.add(editedUser);
          // should this be a lowercase `users`?
          // render user show page
        }
      })
    }
})