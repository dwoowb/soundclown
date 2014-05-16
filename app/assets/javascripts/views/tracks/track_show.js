Soundclown.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/show'],

  events: {
    "click .fa-plus": "openModal",
    "click .modal-x": "closeModal"
  },

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.likes(), "add remove", this.changeLikesStat);
    this.listenTo(this.model.reblogs(), "add remove", this.changeReblogsStat);
    this.listenTo(this.model.comments(), "add remove", this.changeCommentsStat);
    this.listenTo(this.model.comments(), "add", this.addComment);
    this.listenTo(this.model.comments(), "remove", this.removeComment);


    var likesNew = new Soundclown.Views.LikesNew({
      likedItem: this.model,
      likeableType: "Track"
    });
    this.addSubview(".like-new", likesNew);

    var reblogsNew = new Soundclown.Views.ReblogsNew({
      rebloggedItem: this.model,
      rebloggableType: "Track"
    });
    this.addSubview(".reblog-new", reblogsNew);

    var commentsNew = new Soundclown.Views.CommentsNew({
      track: this.model
    });
    this.addSubview(".comments-new", commentsNew);

		var likesStat = new Soundclown.Views.LikesStat({
			track: this.model
		});
		this.addSubview(".likes-stat", likesStat);

    var reblogsStat = new Soundclown.Views.ReblogsStat({
      track: this.model
    });
    this.addSubview(".reblogs-stat", reblogsStat);

    var commentsStat = new Soundclown.Views.CommentsStat({
      track: this.model
    });
    this.addSubview(".comments-stat", commentsStat);

    this.model.comments().each(this.addComment.bind(this));
  },

  changeLikesStat: function() {
		var track = this.model;
    var newLikesStat = new Soundclown.Views.LikesStat({
      track: track
    });
    var oldLikesStat = _(this.subviews()[".likes-stat"]).find(function(subview) {
      return subview.track == track;
    });
    this.removeSubview(".likes-stat", oldLikesStat);
    this.addSubview(".likes-stat", newLikesStat);
    newLikesStat.render();
  },

  changeReblogsStat: function() {
    var track = this.model;
    var newReblogsStat = new Soundclown.Views.ReblogsStat({
      track: track
    });
    var oldReblogsStat = _(this.subviews()[".reblogs-stat"]).find(function(subview) {
      return subview.track == track;
    });
    this.removeSubview(".reblogs-stat", oldReblogsStat);
    this.addSubview(".reblogs-stat", newReblogsStat);
    newReblogsStat.render();
  },

  changeCommentsStat: function() {
    var track = this.model;
    var newCommentsStat = new Soundclown.Views.CommentsStat({
      track: track
    });
    var oldCommentsStat = _(this.subviews()[".comments-stat"]).find(function(subview) {
      return subview.track == track;
    });
    this.removeSubview(".comments-stat", oldCommentsStat);
    this.addSubview(".comments-stat", newCommentsStat);
    newCommentsStat.render();
  },

	addComment: function(comment) {
		var commentsShow = new Soundclown.Views.CommentsShow({
			model: comment
		});

    this.addSubview(".comments-index", commentsShow);
    commentsShow.render();
	},

	removeComment: function(comment) {
    var commentsShow = _(this.subviews()[".comments-index"]).find(function(subview) {
      return subview.model == comment;
    });

    this.removeSubview(".comments-index", commentsShow);
	},

  openModal: function(event) {
    view = this;
    event.preventDefault();
    $("#playlist-modal").addClass("is-active");
    Soundclown.currentUser.playlists().each(function(playlist) {
      var playlistsAdd = new Soundclown.Views.PlaylistsAdd({
        model: playlist,
        track: view.model
      });
      view.addSubview(".modal-content", playlistsAdd);
			// debugger
      playlistsAdd.render();
    });
  },

  closeModal: function(event) {
    view = this;
    event.preventDefault();

    $("#playlist-modal").removeClass("is-active");

    Soundclown.currentUser.playlists().each(function(playlist) {
      var playlistsAdd = _(view.subviews()[".modal-content"]).find(function(subview) {
        return subview.model == playlist;
      });
      view.removeSubview(".modal-content", playlistsAdd);
    });
  },

  render: function() {
    var renderedContent = this.template({
      track: this.model
    });
    this.$el.html(renderedContent);
    this.renderSubviews();

    return this;
  }

});
