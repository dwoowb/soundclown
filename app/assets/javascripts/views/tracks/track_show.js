Soundclown.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/show'],

  events: {
    "click .fa-plus": "openModal",
    "click .modal-x": "closeModal"
  },

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.likes(), "add change remove", this.changeLikesStat);
    // this.listenTo(this.model.reblogs(), "add change remove", this.changeReblogsStat);
    // this.listenTo(this.model.comments(), "add change remove", this.changeCommentsStat);
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

    this.model.comments().each(this.addComment.bind(this));
  },

  changeLikesStat: function() {
    // :[ it shows up but renders before the likes_count is updated...
		var track = this.model;
		debugger
    var newLikesStat = new Soundclown.Views.LikesStat({
      track: this.model
    });
		
    var oldLikesStat = _(this.subviews()[".likes-stat"]).find(function(subview) {
      return subview.track == track;
    });
		
		// debugger

    this.removeSubview(".likes-stat", oldLikesStat);
		
    this.addSubview(".likes-stat", newLikesStat);
    newLikesStat.render();
  },

  changeReblogsStat: function() {
    // :[ it shows up but renders before the reblogs_count is updated...
    var reblogsStat = new Soundclown.Views.ReblogsStat({
      track: this.model
    });

    this.addSubview(".reblogs-stat", reblogsStat);
    reblogsStat.render();
  },

  changeCommentsStat: function() {
    // :[ it shows up but renders before the comments_count is updated...
    var commentsStat = new Soundclown.Views.CommentsStat({
      track: this.model
    });

    this.addSubview(".comments-stat", commentsStat);
    commentsStat.render();
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
