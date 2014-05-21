Soundclown.Views.UserStream = Backbone.CompositeView.extend({
  template: JST["users/stream"],

  initialize: function(options) {
    var view = this;
    Soundclown.currentUser.followees().each(function(followee) {
      view.listenTo(followee.rebloggedTracks(), "add", this.addTrack);
      view.listenTo(followee.rebloggedTracks(), "remove", this.removeTrack);
      view.listenTo(followee.rebloggedPlaylists(), "add", this.addPlaylist);
      view.listenTo(followee.rebloggedPlaylists(), "remove", this.removePlaylist);

      followee.rebloggedTracks().each(view.addTrack.bind(view));
      followee.rebloggedPlaylists().each(view.addPlaylist.bind(view));
    });
  },

	addTrack: function(track) {
		var trackPreview = new Soundclown.Views.TrackPreview({
			model: track
		});
    this.addSubview(".stream-index", trackPreview);
    trackPreview.render();
	},

	removeTrack: function(track) {
    var trackPreview = _(this.subviews()[".stream-index"]).find(function(subview) {
      return subview.model == track;
    });

    this.removeSubview(".stream-index", trackPreview);
	},

	addPlaylist: function(playlist) {
		var playlistPreview = new Soundclown.Views.PlaylistPreview({
			model: playlist
		});
    this.addSubview(".stream-index", playlistPreview);
    playlistPreview.render();
	},

	removePlaylist: function(playlist) {
    var playlistPreview = _(this.subviews()[".stream-index"]).find(function(subview) {
      return subview.model == playlist;
    });
    this.removeSubview(".stream-index", playlistPreview);
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