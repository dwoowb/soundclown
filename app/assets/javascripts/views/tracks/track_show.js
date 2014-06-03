Soundclown.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/show'],

  events: {
    "click .fa-plus": "openModal",
    "click .modal-x": "closeModal"
  },

  initialize: function(options) {
    var view = this;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.likes(), "add remove", this.changeLikesStat);
    this.listenTo(this.model.reblogs(), "add remove", this.changeReblogsStat);
    this.listenTo(this.model.comments(), "add remove", this.changeCommentsStat);
    this.listenTo(this.model.comments(), "add", this.addComment);
    this.listenTo(this.model.comments(), "remove", this.removeComment);
    this.listenTo(Soundclown.currentUser.playlists(), "add", this.addPlaylist);
    this.listenTo(Soundclown.currentUser.playlists(), "remove", this.removePlaylist);

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
			likedItem: this.model
		});
		this.addSubview(".likes-stat", likesStat);

    var reblogsStat = new Soundclown.Views.ReblogsStat({
      rebloggedItem: this.model
    });
    this.addSubview(".reblogs-stat", reblogsStat);

    var commentsStat = new Soundclown.Views.CommentsStat({
      track: this.model
    });
    this.addSubview(".comments-stat", commentsStat);

    this.model.comments().each(this.addComment.bind(this));
    Soundclown.currentUser.playlists().each(this.addPlaylist.bind(this));

    var playlistsNew = new Soundclown.Views.PlaylistsNew({
      track: this.model
    });
    this.addSubview(".playlist-new-container", playlistsNew);
  },

  changeLikesStat: function() {
		var track = this.model;
    var newLikesStat = new Soundclown.Views.LikesStat({
      likedItem: track
    });
    var oldLikesStat = _(this.subviews()[".likes-stat"]).find(function(subview) {
      return subview.likedItem == track;
    });
    this.removeSubview(".likes-stat", oldLikesStat);
    this.addSubview(".likes-stat", newLikesStat);
    newLikesStat.render();
  },

  changeReblogsStat: function() {
    var track = this.model;
    var newReblogsStat = new Soundclown.Views.ReblogsStat({
      rebloggedItem: track
    });
    var oldReblogsStat = _(this.subviews()[".reblogs-stat"]).find(function(subview) {
      return subview.rebloggedItem == track;
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

	addPlaylist: function(playlist) {
    var playlistsAdd = new Soundclown.Views.PlaylistsAdd({
      model: playlist,
      track: this.model
    });

    this.addSubview(".playlist-add-container", playlistsAdd);
    playlistsAdd.render();
	},

	removePlaylist: function(playlist) {
    var playlistsAdd = _(this.subviews()[".modal-content"]).find(function(subview) {
      return subview.model == playlist;
    });

    this.removeSubview(".playlist-add-container", playlistsAdd);
	},

  openModal: function(event) {
    event.preventDefault();
    $("#playlist-modal").addClass("is-active");
  },

  closeModal: function(event) {
    event.preventDefault();
    $("#playlist-modal").removeClass("is-active");
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
