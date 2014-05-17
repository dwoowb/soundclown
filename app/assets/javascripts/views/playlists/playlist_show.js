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
    // debugger
    var tracksIndex = new Soundclown.Views.TracksIndex({
      collection: this.model.tracks()
    })
    this.addSubview(".playlist-tracks", tracksIndex);
		var likesStat = new Soundclown.Views.LikesStat({
			likedItem: this.model
		});
		this.addSubview(".likes-stat", likesStat);
    var reblogsStat = new Soundclown.Views.ReblogsStat({
      rebloggedItem: this.model
    });
    this.addSubview(".reblogs-stat", reblogsStat);
  },

  changeLikesStat: function() {
		var playlist = this.model;
    var newLikesStat = new Soundclown.Views.LikesStat({
      likedItem: playlist
    });
    var oldLikesStat = _(this.subviews()[".likes-stat"]).find(function(subview) {
      return subview.likedItem == playlist;
    });
    this.removeSubview(".likes-stat", oldLikesStat);
    this.addSubview(".likes-stat", newLikesStat);
    newLikesStat.render();
  },

  changeReblogsStat: function() {
    var playlist = this.model;
    var newReblogsStat = new Soundclown.Views.ReblogsStat({
      rebloggedItem: playlist
    });
    var oldReblogsStat = _(this.subviews()[".reblogs-stat"]).find(function(subview) {
      return subview.rebloggedItem == playlist;
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
