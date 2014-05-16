Soundclown.Views.LikesNew = Backbone.View.extend({
  template: JST["likes/new"],
  className: "like-new",

  events: {
    "submit form.like": "like",
    "submit form.unlike": "unlike"
  },

  initialize: function(options) {
    this.likedItem = options.likedItem,
    this.likeableType = options.likeableType
  },

  like: function(event) {
    event.preventDefault();

    var $submit = $(event.currentTarget)
    var $scope = $submit.closest("form");
    var params = $submit.serializeJSON()["like"];
    var like = new Soundclown.Models.Like(params);

    like.save({}, {
      success: function() {
        Soundclown.likes.add(like);
        Soundclown.currentUser.likes().add(like);
        $(".like-form").addClass("been-liked");
      }
    });
    this.likedItem.likes().add(like);
  },

  unlike: function(event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON()["like"];
    var like = Soundclown.currentUser
                           .likes()
                           .findWhere({ likeable_id: parseInt(params["likeable_id"]) });
    this.likedItem.likes().remove(like);
    like.destroy({
      success: function() {
        $(".like-form").removeClass("been-liked");
      }
    })

  },

  render: function() {
    var renderedContent = this.template({
      user: Soundclown.currentUser,
      likedItem: this.likedItem,
      likeableType: this.likeableType
    });

    this.$el.html(renderedContent);
    return this;
  }

})