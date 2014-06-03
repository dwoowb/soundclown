Soundclown.Views.CommentsPreview = Backbone.View.extend({
	template: JST["comments/preview"],

	events: {
		"submit form.destroy": "destroy"
	},

	render: function() {
	  var renderedContent = this.template({
	  	comment: this.model
	  });

	  this.$el.html(renderedContent);
	  return this;
	},

	destroy: function() {
    var comment = this.model;
    var track = Soundclown.tracks.findWhere({ id: comment.get("track").id })
    track.comments().remove(comment);
	  comment.destroy();
	}
})