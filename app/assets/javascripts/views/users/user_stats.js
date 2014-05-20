Soundclown.Views.UserStats = Backbone.CompositeView.extend({
  template: JST["users/stats"],
  className: "user-stats-wrapper",

  initialize: function(options) {
    this.listenTo(this.model, "add remove change", this.render);
    var userPlaylistsStat = new Soundclown.Views.UserPlaylistsStat({
      user: this.model
    });
    this.addSubview(".user-playlists-stat", userPlaylistsStat);
    var userLikesStat = new Soundclown.Views.UserLikesStat({
      user: this.model
    });
    this.addSubview(".user-likes-stat", userLikesStat);
    var userFolloweesStat = new Soundclown.Views.UserFolloweesStat({
      user: this.model
    });
    this.addSubview(".user-followees-stat", userFolloweesStat);
    var userCommentsStat = new Soundclown.Views.UserCommentsStat({
      user: this.model
    });
    this.addSubview(".user-comments-stat", userCommentsStat);
  },

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      user: this.model
    });
    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  }
})