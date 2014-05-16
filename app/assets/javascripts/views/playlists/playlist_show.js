Soundclown.Views.PlaylistShow = Backbone.CompositeView.extend({
  template: JST['playlists/show'],

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);

    var likesNew = new Soundclown.Views.LikesNew({
      likedItem: this.model,
      likeableType: "Playlist"
    });

    this.addSubview(".like-new", likesNew);

    var reblogsNew = new Soundclown.Views.ReblogsNew({
      rebloggedItem: this.model,
      rebloggableType: "Playlist"
    });
    this.addSubview(".reblog-new", reblogsNew);

    var tracksIndex = new Soundclown.Views.TracksIndex({
      collection: this.model.tracks()
    })
    // debugger
    this.addSubview(".playlist-tracks", tracksIndex);
  },

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      playlist: this.model
    });
    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  }



});
