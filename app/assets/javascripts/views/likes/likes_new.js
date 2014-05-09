Soundclown.Views.LikesNew = Backbone.View.extend({
  template: JST["likes/new"],
  className: "like-new",

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

      var params = $(event.currentTarget).serializeJSON()["like"];
      var newLike = new Soundclown.Models.Like(params);

      newLike.update({}, {
        success: function() {
          Soundclown.Collections.Likes.add(newLike);
        }
      })
    }
})