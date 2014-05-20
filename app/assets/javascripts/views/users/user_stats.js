Soundclown.Views.UserStats = Backbone.CompositeView.extend({
  template: JST["users/stats"],
  className: "user-stats-wrapper",

  initialize: function(options) {
    this.listenTo(this.model, "add remove change", this.render);
    this.listenTo(this.model.likes(), "add remove change", this.changeLikesStat)
    this.listenTo(this.model.playlists(), "add remove change", this.changePlaylistsStat)
    this.listenTo(this.model.followees(), "add remove change", this.changeFolloweesStat)
    this.listenTo(this.model.comments(), "add remove change", this.changeCommentsStat)

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

  changeLikesStat: function() {
		var user = this.model;
    var newLikesStat = new Soundclown.Views.UserLikesStat({
      user: user
    });
    var oldLikesStat = _(this.subviews()[".user-likes-stat"]).find(function(subview) {
      return subview.user == user;
    });
    this.removeSubview(".user-likes-stat", oldLikesStat);
    this.addSubview(".user-likes-stat", newLikesStat);
    newLikesStat.render();
  },

  changePlaylistsStat: function() {
		var user = this.model;
    var newPlaylistsStat = new Soundclown.Views.UserPlaylistsStat({
      user: user
    });
    var oldPlaylistsStat = _(this.subviews()[".user-playlists-stat"]).find(function(subview) {
      return subview.user == user;
    });
    this.removeSubview(".user-playlists-stat", oldPlaylistsStat);
    this.addSubview(".user-playlists-stat", newPlaylistsStat);
    newPlaylistsStat.render();
  },

  changeFolloweesStat: function() {
		var user = this.model;
    var newFolloweesStat = new Soundclown.Views.UserFolloweesStat({
      user: user
    });
    var oldFolloweesStat = _(this.subviews()[".user-followees-stat"]).find(function(subview) {
      return subview.user == user;
    });
    this.removeSubview(".user-followees-stat", oldFolloweesStat);
    this.addSubview(".user-followees-stat", newFolloweesStat);
    newFolloweesStat.render();
  },

  changeCommentsStat: function() {
		var user = this.model;
    var newCommentsStat = new Soundclown.Views.UserCommentsStat({
      user: user
    });
    var oldCommentsStat = _(this.subviews()[".user-comments-stat"]).find(function(subview) {
      return subview.user == user;
    });
    this.removeSubview(".user-comments-stat", oldCommentsStat);
    this.addSubview(".user-comments-stat", newCommentsStat);
    newCommentsStat.render();
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