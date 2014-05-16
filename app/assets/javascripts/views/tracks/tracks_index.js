Soundclown.Views.TracksIndex = Backbone.CompositeView.extend({
  template: JST["tracks/index"],

  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTrack);
    this.listenTo(this.collection, "remove", this.removeTrack)

    this.collection.each(this.addTrack.bind(this));
  },

	addTrack: function(track) {
		var trackShow = new Soundclown.Views.TrackShow({
			model: track
		});

    this.addSubview(".tracks-index", trackShow);
    trackShow.render();
	},

	removeTrack: function(track) {
    var trackShow = _(this.subviews()[".tracks-index"]).find(function(subview) {
      return subview.model == track;
    });

    this.removeSubview(".tracks-index", trackShow);
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