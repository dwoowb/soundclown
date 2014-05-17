Soundclown.Views.PlaylistShow = Backbone.CompositeView.extend({
  template: JST['playlists/show'],

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.likes(), "add remove", this.changeLikesStat);
    this.listenTo(this.model.reblogs(), "add remove", this.changeReblogsStat);

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
    this.addSubview(".playlist-tracks", tracksIndex);
		var likesStat = new Soundclown.Views.LikesStat({
			track: this.model
		});
		this.addSubview(".likes-stat", likesStat);
    var reblogsStat = new Soundclown.Views.ReblogsStat({
      track: this.model
    });
    this.addSubview(".reblogs-stat", reblogsStat);
  },

  changeLikesStat: function() {
		var playlist = this.model;
    var newLikesStat = new Soundclown.Views.LikesStat({
      track: playlist
    });
    var oldLikesStat = _(this.subviews()[".likes-stat"]).find(function(subview) {
      return subview.track == playlist;
    });
    debugger
    this.removeSubview(".likes-stat", oldLikesStat);
    this.addSubview(".likes-stat", newLikesStat);
    newLikesStat.render();
  },

  changeReblogsStat: function() {
    var playlist = this.model;
    var newReblogsStat = new Soundclown.Views.ReblogsStat({
      track: playlist
    });
    var oldReblogsStat = _(this.subviews()[".reblogs-stat"]).find(function(subview) {
      return subview.track == playlist;
    });
    this.removeSubview(".reblogs-stat", oldReblogsStat);
    this.addSubview(".reblogs-stat", newReblogsStat);
    newReblogsStat.render();
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
