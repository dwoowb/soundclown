Soundclown.Models.Playlist = Backbone.Model.extend({
  urlRoot: "/api/playlists",

  parse: function(jsonResp) {
    if (jsonResp["creator"]) {
      jsonResp["creator"] = Soundclown.users.add(jsonResp["creator"])
    }

    return jsonResp;
  }
});
