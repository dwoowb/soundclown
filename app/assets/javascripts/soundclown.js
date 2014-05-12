window.Soundclown = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    var data = JSON.parse($("#bootstrapped-json").html());

    this.currentUser = new Soundclown.Models.User(data["currentUser"], { parse: true });
    this.users = new Soundclown.Collections.Users(Soundclown.currentUser);
    this.tracks = Soundclown.currentUser.tracks();
    this.playlists = Soundclown.currentUser.playlists();
    this.likes = Soundclown.currentUser.likes();
    this.reblogs = Soundclown.currentUser.reblogs();
    this.comments = Soundclown.currentUser.comments();
    // debugger
    new Soundclown.Routers.Users({});
    new Soundclown.Routers.Tracks({});
    new Soundclown.Routers.Playlists({});

    Backbone.history.start();

  },

  _elements: {
    leftbar: "#leftbar",
    rootEl: "#content",
    rightbar: "#rightbar"
  },

  _currentViews: {
    leftbar: null,
    rootEl: null,
    rightbar: null
  },

  _swapView: function(partialEl, view) {
    this._currentViews[partialEl] && this._currentViews[partialEl].remove();
    this._currentViews[partialEl] = view;
    $(this._elements[partialEl]).html(view.render().$el);
  }
};

Backbone.CompositeView = Backbone.View.extend({
	subviews: {
		
	}
});