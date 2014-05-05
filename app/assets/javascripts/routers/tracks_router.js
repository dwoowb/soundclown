Soundclown.Routers.Tracks = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "tracksIndex",
    "tracks/:id": "tracksShow"
  },

  tracksIndex: function() {

  }
})