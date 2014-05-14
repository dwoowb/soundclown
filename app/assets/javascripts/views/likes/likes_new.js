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

  render: function() {
    var renderedContent = this.template({
      user: Soundclown.currentUser,
      likedItem: this.likedItem,
      likeableType: this.likeableType
    });

    this.$el.html(renderedContent);
    return this;
  },

  like: function(event) {
    var view = this;
    event.preventDefault();

    var $submit = $(event.currentTarget)
    var $scope = $submit.closest("form");
    var params = $submit.serializeJSON()["like"];
    var like = new Soundclown.Models.Like(params);

    like.save({}, {
      success: function() {
        Soundclown.likes.add(like);
        Soundclown.currentUser.likes().add(like);
        view.likedItem.likes().add(like);
        $(".like-form").addClass("been-liked");
      }
    });
  },

  unlike: function(event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON()["like"];
    var unlike = Soundclown.currentUser
                           .likes()
                           .findWhere({ likeable_id: parseInt(params["likeable_id"]) });

    unlike.destroy({
      success: function() {
        $(".like-form").removeClass("been-liked");
      }
    })

  }

})