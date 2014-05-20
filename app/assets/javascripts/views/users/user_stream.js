Soundclown.Views.UserStream = Backbone.CompositeView.extend({
  template: JST["users/stream"],

  initialize: function(options) {
    Soundclown.currentUser.followees().each(function(followee) {

      this.listenTo(this.followee.rebloggedTracks(), "add", this.addTrack);
      this.listenTo(this.followee.rebloggedTracks(), "remove", this.removeTrack);
      this.listenTo(this.followee.rebloggedPlaylists(), "add", this.addPlaylist);
      this.listenTo(this.followee.rebloggedPlaylists(), "remove", this.removePlaylist);

      this.user.rebloggedTracks().each(this.addTrack.bind(this));
      this.user.rebloggedPlaylists().each(this.addPlaylist.bind(this));
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