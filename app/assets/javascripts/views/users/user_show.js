Soundclown.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],

  initialize: function(options) {
		this.listen
  },
	
	render: function() {
		var renderedContent = this.template({
			user: this.model
		});
		this.$el.html(renderedContent);
		this.renderSubviews();
		return this;
	}

})