Soundclown.Views.CommentsShow = Backbone.View.extend({
	template: JST["comments/show"],

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
	  this.model.destroy();
	}
})