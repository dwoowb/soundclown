Soundclown.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/show'],

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.likes(), "add change remove", this.changeLikesStat);
    this.listenTo(this.model.reblogs(), "add change remove", this.changeReblogsStat);
    this.listenTo(this.model.comments(), "add change remove", this.changeCommentsStat);
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

    // TODO: have these work, perhaps implement a top level updateSubview method
    this.changeLikesStat();
    this.changeReblogsStat();
    this.changeCommentsStat();
    this.model.comments().each(this.addComment.bind(this));
  },

  changeLikesStat: function() {
    // :[ it shows up but renders before the likes_count is updated...
    var likesStat = new Soundclown.Views.LikesStat({
      track: this.model
    });

    this.addSubview(".likes-stat", likesStat);
    likesStat.render();
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

  render: function() {
    var renderedContent = this.template({
      track: this.model
    });
    this.$el.html(renderedContent);
    this.renderSubviews();

    return this;
  }

});
