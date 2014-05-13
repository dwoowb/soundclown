Soundclown.Views.CommentsNew = Backbone.View.extend({
  template: JST["comments/new"],

  events: {
	 "submit form": "submit"
  },

	initialize: function(options) {
		this.track = options.track
	},

  render: function() {
    var renderedContent = this.template({
    	track: this.track
    });

    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event) {
		var view = this;
		event.preventDefault();

		var params = $(event.currentTarget).serializeJSON()["comment"];
		var comment = new Soundclown.Models.Comment(params);

		comment.save({}, {
			success: function() {
				view.track.comments().add(comment);
				view.$("textarea[name=comment\\[body\\]]").val("");
			}
		});
  }
})