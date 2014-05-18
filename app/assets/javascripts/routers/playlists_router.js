Soundclown.Routers.Playlists = Backbone.Router.extend({
  initialize: function(options) {
  },

  routes: {
    "api/playlists/:id": "playlistShow"
  },

  playlistShow: function(id) {
    var that = this;
    this._getPlaylist(id, function(playlist) {
      var showView = new Soundclown.Views.PlaylistShow({
        model: playlist
      });
      Soundclown._swapView("rootEl", showView)
    });
  },

  _getPlaylist: function(id, callback) {
    var that = this;
    var playlist = Soundclown.playlists.get(id);
    if(!playlist) {
      playlist = new Soundclown.Models.Playlist({
        id: id
      });
      playlist.fetch({
        success: function() {
          Soundclown.playlists.add(playlist);
          callback(playlist);
        }
      });
    } else {
      callback(playlist)
    }
  }
})