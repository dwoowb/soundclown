Soundclown.Views.UserMain = Backbone.CompositeView.extend({
  template: JST["users/main"],
  className: "user-main",

  initialize: function(options) {
    var that = this;
    this.listenTo(this.model.tracks(), "add", this.addTrack);
    this.listenTo(this.model.tracks(), "remove", this.removeTrack);
    this.listenTo(this.model.rebloggedTracks(), "add", this.addTrack);
    this.listenTo(this.model.rebloggedTracks(), "remove", this.removeTrack);
    this.listenTo(this.model.playlists(), "add", this.addPlaylist);
    this.listenTo(this.model.playlists(), "remove", this.removePlaylist);
    this.listenTo(this.model.rebloggedPlaylists(), "add", this.addPlaylist);
    this.listenTo(this.model.rebloggedPlaylists(), "remove", this.removePlaylist);
		
		this.model.tracks().each(this.addTrack.bind(this));
		this.model.rebloggedTracks().each(this.addTrack.bind(this));
		this.model.playlists().each(this.addPlaylist.bind(this));
		// this.model.rebloggedPlaylists().each(this.addPlaylist.bind(this));
  },
	
	addTrack: function(track) {
		var trackPreview = new Soundclown.Views.TrackPreview({
			model: track
		});

    this.addSubview(".main-index", trackPreview);
    trackPreview.render();
	},

	removeTrack: function(track) {
    var trackPreview = _(this.subviews()[".main-index"]).find(function(subview) {
      return subview.model == track;
    });

    this.removeSubview(".main-index", trackPreview);
	},
	
	addPlaylist: function(playlist) {
		var playlistPreview = new Soundclown.Views.PlaylistPreview({
			model: playlist
		});

    this.addSubview(".main-index", playlistPreview);
    playlistPreview.render();
	},

	removePlaylist: function(playlist) {
    var playlistPreview = _(this.subviews()[".main-index"]).find(function(subview) {
      return subview.model == playlist;
    });

    this.removeSubview(".main-index", playlistPreview);
	},

  render: function() {
    var renderedContent = this.template({
      tracks: this.model.tracks(),
      rebloggedTracks: this.model.rebloggedTracks(),
      playlists: this.model.playlists(),
      rebloggedPlaylists: this.model.rebloggedPlaylists()
    });

    this.$el.html(renderedContent);
		// TODO: ORDER SUBVIEWS BY TIME OF CREATION
		this.renderSubviews();
    return this;
  }
})