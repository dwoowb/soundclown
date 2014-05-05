window.Soundclown = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    var data = JSON.parse($("#bootstrapped-json").html());

    Soundclown.currentUser = new Soundclown.Models.User(data["currentUser"], { parse: true });
    Soundclown.users = new Soundclown.Collections.Users(Soundclown.currentUser);

    new Soundclown.Routers.Users({});

    Backbone.history.start();

  },

  _elements: {
    leftbar: $("#leftbar"),
    rootEl: $("#content"),
    rightbar: $("#rightbar")
  },

  _currentViews: {
    leftbar: null,
    rootEl: null,
    rightbar: null
  },

  _swapView: function(partialEl, view) {
    this._currentViews[partialEl] && this._currentViews[partialEl].remove();
    this._currentViews[partialEl] = view;
    this._elements[partialEl].html(view.render().$el);
  }
};