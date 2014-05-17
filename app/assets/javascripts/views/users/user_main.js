Soundclown.Views.UserMain = Backbone.View.extend({
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
    this.listenTo(this.model.rebloggedPlaylists(), "add", this.addTrack);
    this.listenTo(this.model.rebloggedPlaylists(), "remove", this.removePlaylist);
  },

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      tracks: this.model.tracks(),
      rebloggedTracks: this.model.rebloggedTracks(),
      playlists: this.model.playlists(),
      rebloggedPlaylists: this.model.rebloggedPlaylists()
    });

    this.$el.html(renderedContent);
    return this;
  }
})