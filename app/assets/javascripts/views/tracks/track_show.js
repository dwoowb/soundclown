Soundclown.Views.TrackShow = Backbone.View.extend({
  template: JST['tracks/show'],

  initialize: function(options) {
    this.listenTo(this.model.comments(), "add", this.addComment);
    this.listenTo(this.model.comments(), "remove", this.removeComment);
		// what is this.addComment doing?
		// what is .bind doing in this context?
		this.model.comments().each(this.addComment.bind(this));
  },

  events: {
		// could possibly respond to the player, but that will probably be its own view
  },
	
	addComment: function(comment) {
		var commentShow = new Soundclown.Views.CommentsShow({
			model: comment
		});
		
		// start watching the composite views videos
	},
	
	removeComment: function(comment) {
		// should be removing the subview
	},

  render: function() {
		var view = this;
    var renderedContent = this.template({
      track: this.model
    });	
    this.$el.html(renderedContent);
			
		this.model.comments().each(function(comment) {
			var commentsShow = new Soundclown.Views.CommentsShow({
				model: comment
			});		
			view.$(".comments-index").append(commentsShow.render().$el);
		});
		
    var commentsNew = new Soundclown.Views.CommentsNew({
    	track: this.model
    });
    this.$(".comment-new").html(commentsNew.render().$el);
			
    return this;	
  }

});
