Soundclown.Views.TracksIndex = Backbone.CompositeView.extend({
  template: JST["tracks/index"],

  initialize: function(options) {
    this.user = options.user
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTrack);
    this.listenTo(this.collection, "remove", this.removeTrack)

    this.collection.each(this.addTrack.bind(this));
  },

	addTrack: function(track) {
		var trackPreview = new Soundclown.Views.TrackPreview({
			model: track,
      user: this.user
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
      tracks: this.collection
    });
    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  }
})