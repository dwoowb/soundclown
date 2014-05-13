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
  addSubview: function(selector, subview) {
    var selectorSubviews = this.subviews()[selector] || (this.subviews()[selector] = []);
    selectorSubviews.push(subview);

    var $selectorEl = this.$(selector);
    $selectorEl.prepend(subview.$el);
  },

  remove: function() {
    Backbone.View.prototype.remove.call(this);

    _(this.subviews()).each(function(selectorSubviews, selector) {
      _(selectorSubviews).each(function(subview) {
        subview.remove();
      })
    })
  },

  removeSubview: function(selector, subview) {
    var selectorSubviews = this.subviews()[selector] || (this.subviews()[selector] = []);

    var subviewIndex = selectorSubviews.indexOf(subview);
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();
  },

  renderSubviews: function() {
    var view = this;

    _(this.subviews()).each(function(selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();

      _(selectorSubviews).each(function(subview) {
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
        // delegateEvents reattaches event handlers that were cleared by replaced the DOM elements in the subview's render()
      });
    });
  },

	subviews: function() {
    if (!this._subviews) {
      this._subviews = {};
    }

    return this._subviews;
    // subviews as a function is necessary as it should be setting subviews for instances of CompositeView, not as a prototype
	}
});