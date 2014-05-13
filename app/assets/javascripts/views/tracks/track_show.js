Soundclown.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/show'],

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.comments(), "add", this.addComment);
    this.listenTo(this.model.comments(), "remove", this.removeComment);

    var likesNew = new Soundclown.Views.LikesNew({
      likedItem: this.model,
      likeableType: "Track"
    });
    this.addSubview(".like-new", likesNew);

    this.model.comments().each(this.addComment.bind(this));
    // the above line is an abbreviation for the below block
    // var view = this;
//     this.model.comments().each(function(comment) {
//       var commentsShow = new Soundclown.Views.CommentsShow({
//         model: comment
//       });
//
//       view.addSubview(".comments-index", commentsShow);
//     });


    var commentsNew = new Soundclown.Views.CommentsNew({
      track: this.model
    });
    this.addSubview(".comments-new", commentsNew);


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
