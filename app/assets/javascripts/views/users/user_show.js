Soundclown.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],

  initialize: function(options) {
    var mainView = new Soundclown.Views.UserMain({
      model: this.model
    });
    this.addSubview(".user-main", mainView);
    var profileView = new Soundclown.Views.UserProfile({
      model: this.model
    });
    this.addSubview(".user-profile", profileView);
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