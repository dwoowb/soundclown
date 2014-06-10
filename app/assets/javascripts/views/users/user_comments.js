Soundclown.Views.UserComments = Backbone.CompositeView.extend({
  template: JST["users/comments"],

  initialize: function(options) {
    this.user = options.model
    this.listenTo(this.user.comments(), "add", this.addComment);
    this.listenTo(this.user.comments(), "remove", this.removeComment);
    this.user.comments().each(this.addComment.bind(this));
    var miniNav = new Soundclown.Views.MiniNav({
      user: this.user
    });
    this.addSubview(".mini-nav", miniNav);
  },

	addComment: function(comment) {
		var commentsPreview = new Soundclown.Views.CommentsPreview({
			model: comment
		});
		var trackToAdd = new Soundclown.Models.Track(comment.get("track"));
		Soundclown.tracks.add(trackToAdd);
		// adds commented tracks to global tracks collection
		
    this.addSubview(".comments-index", commentsPreview);
    commentsPreview.render();
	},

	removeComment: function(comment) {
    var commentsPreview = _(this.subviews()[".comments-index"]).find(function(subview) {
      return subview.model == comment;
    });

    this.removeSubview(".comments-index", commentsPreview);
	},

  render: function() {
    var renderedContent = this.template({
      user: this.user
    });
    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  }
})