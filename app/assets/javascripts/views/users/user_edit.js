Soundclown.Views.UserEdit = Backbone.View.extend({
  template: JST["users/edit"],
  className: "user-edit",

  initialize: function(options) {
    this.user = options.user
  },

  events: {
    "submit form": "submit"
  },

  render: function() {
    var renderedContent = this.template({
      user: this.user
    });

    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON()["user"];
    var editedUser = new Soundclown.Models.User(params);
    debugger
    editedUser.save({}, {});
}
});