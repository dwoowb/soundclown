Soundclown.Routers.Tracks = Backbone.Router.extend({
  initialize: function(options) {
  },

  routes: {
    "api/tracks/:id": "trackShow"
  },

  trackShow: function(id) {
    var that = this;
    this._getTrack(id, function(track) {
      var showView = new Soundclown.Views.TrackShow({
        model: track
      })
      Soundclown._swapView("rootEl", showView)
    });
  },

  _getTrack: function(id, callback) {
    var that = this;
    var track = Soundclown.tracks.get(id);
    if(!track) {
      track = new Soundclown.Models.Track({
        id: id
      });
      track.fetch({
        success: function() {
          Soundclown.tracks.add(track);
          callback(track);
        }
      });
    } else {
      callback(track)
    }
  }
})