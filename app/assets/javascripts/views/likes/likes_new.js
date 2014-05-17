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
    var that = this;
    var $submit = $(event.currentTarget)
    var $scope = $submit.closest("div");
    var params = $submit.serializeJSON()["like"];
    var like = new Soundclown.Models.Like(params);

    like.save({}, {
      success: function() {
        Soundclown.likes.add(like);
        Soundclown.currentUser.likes().add(like);
        if (that.likeableType === "Track") {
          Soundclown.currentUser.likedTracks().add(that.likedItem);
        } else {
          Soundclown.currentUser.likedPlaylists().add(that.likedItem);
        };
        $scope.addClass("been-liked");
      }
    });
    this.likedItem.likes().add(like);
  },

  unlike: function(event) {
    event.preventDefault();
    var $submit = $(event.currentTarget)
    var $scope = $submit.closest("div");

    var params = $submit.serializeJSON()["like"];
    var like = Soundclown.currentUser
                           .likes()
                           .findWhere({ likeable_id: parseInt(params["likeable_id"]) });
    this.likedItem.likes().remove(like);
    if (this.likeableType === "Track") {
      Soundclown.currentUser.likedTracks().remove(this.likedItem);
    } else {
      Soundclown.currentUser.likedPlaylists().remove(this.likedItem);
    };
    like.destroy({
      success: function() {
        $scope.removeClass("been-liked");
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