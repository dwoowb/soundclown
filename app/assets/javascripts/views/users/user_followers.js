Soundclown.Views.UserFollowers = Backbone.CompositeView.extend({
  template: JST["users/followers"],

  initialize: function(options) {
    this.user = options.model
    this.listenTo(this.user.followers(), "add", this.addFollower);
    this.listenTo(this.user.followers(), "remove", this.removeFollower);
    this.user.followers().each(this.addFollower.bind(this));

    var miniNav = new Soundclown.Views.MiniNav({
      user: this.user
    });
    this.addSubview(".mini-nav", miniNav);
  },

	addFollower: function(follower) {
		var followers = new Soundclown.Views.Followers({
      user: this.user
			model: follower
		});

    this.addSubview(".followers-index", followers);
    followers.render();
	},

	removeFollower: function(follower) {
    var followers = _(this.subviews()[".followers-index"]).find(function(subview) {
      return subview.model == follower;
    });

    this.removeSubview(".followers-index", followers);
	},

  render: function() {
    var renderedContent = this.template({
      user: this.user
    });
    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  }

});