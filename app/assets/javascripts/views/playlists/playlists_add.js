Soundclown.Views.PlaylistsAdd = Backbone.View.extend({
  template: JST["playlists/add"],

  events: {
    "submit form.add": "add",
    "submit form.remove": "remove"
  },

  initialize: function(options) {
    this.model = options.model,
    this.track = options.track
  },

  render: function() {
    var renderedContent = this.template({
      playlist: this.model,
      track: this.track
    });
    this.$el.html(renderedContent);
    return this;
  },

  add: function(event) {
    var view = this;
    var playlist = this.model;
    var track = this.track;
    event.preventDefault();

    var $submit = $(event.currentTarget)
    var $scope = $submit.closest("form");
    playlist.tracks().add(view.track);
    var playlistTrack = new Soundclown.Models.PlaylistTrack({ track_id: track.id, playlist_id: playlist.id})
    //
    debugger

    playlistTrack.save({}, {
      success: function() {
        alert("you saved the track to this playlist!")
      }
    });
  },

  remove: function(event) {

  }
})