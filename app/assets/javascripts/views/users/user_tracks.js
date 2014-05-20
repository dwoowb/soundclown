Soundclown.Views.UserTracks = Backbone.CompositeView.extend({
  template: JST["users/tracks"],

  initialize: function(options) {
    this.user = options.model;
    this.listenTo(this.user.tracks(), "add", this.addTrack);
    this.listenTo(this.user.tracks(), "remove", this.removeTrack)

    this.user.tracks().each(this.addTrack.bind(this));
    var miniNav = new Soundclown.Views.MiniNav({
      user: this.user
    });
    this.addSubview(".mini-nav", miniNav);
  },

	addTrack: function(track) {
		var trackPreview = new Soundclown.Views.TrackPreview({
			model: track
		});

    this.addSubview(".tracks-index", trackPreview);
    trackPreview.render();
	},

	removeTrack: function(track) {
    var trackPreview = _(this.subviews()[".tracks-index"]).find(function(subview) {
      return subview.model == track;
    });

    this.removeSubview(".tracks-index", trackPreview);
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