Soundclown.Views.PlaylistsNew = Backbone.View.extend({
  template: JST["playlists/new"],

  events: {
    "submit form.new-playlist": "newPlaylist"
  },

  initialize: function(options) {
    this.user = Soundclown.currentUser;
    this.track = options.track;
  },

  newPlaylist: function(event) {
    event.preventDefault();
    var view = this;
    var $submit = $(event.currentTarget);
    var $scope = $submit.closest("form");
    var params = $submit.serializeJSON()["playlist"];
    var playlist = new Soundclown.Models.Playlist(params);

    playlist.save({}, {
      success: function() {
        Soundclown.playlists.add(playlist);
        // this doesn't work. FUCK
				view.$("input[name=playlist\\[title\\]]").val("");
      }
    });
    Soundclown.currentUser.playlists().add(playlist);
  },

  render: function() {
    var renderedContent = this.template({
      user: this.user,
      track: this.track
    });
    this.$el.html(renderedContent);
    return this;
  }
})