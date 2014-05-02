Soundclown.Collections.Tracks = Backbone.Collection.extend({
  url: "/api/tracks",
  model: Soundclown.Models.Track,

  comparator: function(track) {
    return -track.get('id');
  }

});
