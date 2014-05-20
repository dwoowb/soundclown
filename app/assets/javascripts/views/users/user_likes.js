Soundclown.Views.UserLikes = Backbone.CompositeView.extend({
  template: JST["users/likes"],

  initialize: function(options) {
    this.user = options.model;
    this.listenTo(this.user.likedTracks(), "add", this.addTrack);
    this.listenTo(this.user.likedTracks(), "remove", this.removeTrack);
    this.listenTo(this.user.likedPlaylists(), "add", this.addPlaylist);
    this.listenTo(this.user.likedPlaylists(), "remove", this.removePlaylist);

    this.user.likedTracks().each(this.addTrack.bind(this));
    this.user.likedPlaylists().each(this.addPlaylist.bind(this));
    var miniNav = new Soundclown.Views.MiniNav({
      user: this.user
    });
    this.addSubview(".mini-nav", miniNav);
  },

	addTrack: function(track) {
		var trackPreview = new Soundclown.Views.TrackPreview({
			model: track
		});

    this.addSubview(".liked-index", trackPreview);
    trackPreview.render();
	},

	removeTrack: function(track) {
    var trackPreview = _(this.subviews()[".liked-index"]).find(function(subview) {
      return subview.model == track;
    });

    this.removeSubview(".liked-index", trackPreview);
	},

	addPlaylist: function(playlist) {
		var playlistPreview = new Soundclown.Views.PlaylistPreview({
			model: playlist
		});
    this.addSubview(".liked-index", playlistPreview);
    playlistPreview.render();
	},

	removePlaylist: function(playlist) {
    var playlistPreview = _(this.subviews()[".liked-index"]).find(function(subview) {
      return subview.model == playlist;
    });
    this.removeSubview(".liked-index", playlistPreview);
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