Soundclown.Views.PlaylistsAdd = Backbone.View.extend({
  template: JST["playlists/add"],

  events: {
    "submit form.add": "addToPlaylist",
    "submit form.remove": "removeFromPlaylist"
  },

  initialize: function(options) {
    this.model = options.model,
    this.track = options.track
  },

  addToPlaylist: function(event) {
    var view = this;
    var playlist = this.model;
    var track = this.track;
    event.preventDefault();
		debugger
    var $submit = $(event.currentTarget)
    var $scope = $submit.closest("form");
    var playlistTrack = new Soundclown.Models.PlaylistTrack({ track_id: track.id, playlist_id: playlist.id})
    debugger
    playlistTrack.save({}, {});
    Soundclown.playlistTracks.add(playlistTrack);
    playlist.tracks().add(view.track);
    this.render();
  },

  removeFromPlaylist: function(event) {
    var view = this;
    var playlist = this.model;
    var track = this.track;
    event.preventDefault();

    var $submit = $(event.currentTarget)
    var $scope = $submit.closest("form");
    playlist.tracks().remove(view.track);
    debugger
    // TODO: fix this...
    // can't find the playlistTrack from the collection after refresh
    var playlistTrack = Soundclown.playlistTracks.findWhere({ track_id: track.id, playlist_id: playlist.id});
    debugger
    playlistTrack.destroy();
    this.render();
  },


  render: function() {
    var renderedContent = this.template({
      playlist: this.model,
      track: this.track
    });
    this.$el.html(renderedContent);
    return this;
  }
})