Soundclown.Views.UserPlaylists = Backbone.CompositeView.extend({
  template: JST["users/playlists"],

  initialize: function(options) {
    this.user = options.model;
    this.listenTo(this.user.playlists(), "add", this.addPlaylist);
    this.listenTo(this.user.playlists(), "remove", this.removePlaylist);

    this.user.playlists().each(this.addPlaylist.bind(this));
    var miniNav = new Soundclown.Views.MiniNav({
      user: this.user
    });
    this.addSubview(".mini-nav", miniNav);
  },

	addPlaylist: function(playlist) {
		var playlistPreview = new Soundclown.Views.PlaylistPreview({
			model: playlist
		});
    this.addSubview(".playlists-index", playlistPreview);
    playlistPreview.render();
	},

	removePlaylist: function(playlist) {
    var playlistPreview = _(this.subviews()[".main-index"]).find(function(subview) {
      return subview.model == playlist;
    });
    this.removeSubview(".playlists-index", playlistPreview);
	},

  render: function() {
    var renderedContent = this.template({
      user: this.user
    });
    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  }

})