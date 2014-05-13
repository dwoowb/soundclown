Soundclown.Views.LikesNew = Backbone.View.extend({
  template: JST["likes/new"],
  className: "like-new",

  events: {
    "submit form.like": "like",
    "submit form.unlike": "unlike"
  },

  render: function() {
    var renderedContent = this.template({
      user: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

  like: function(event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON()["like"];
    var like = new Soundclown.Models.Like(params);

    like.save({}, {
      success: function() {
        Soundclown.likes.add(like);
        Soundclown.currentUser.likes().add(like);
      }
    })
  },

  unlike: function(event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON()["like"];
    // var unlike = Soundclown.currentUser.likes().find()

  }

})