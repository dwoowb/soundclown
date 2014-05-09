Soundclown.Views.TrackShow = Backbone.View.extend({
  template: JST['tracks/show'],

  initialize: function(options) {
    this.track = options.model
    this.listenTo(this.model.comments(), "add", this.addComment);
    this.listenTo(this.model.comments(), "remove", this.removeComment);
  },

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      track: this.track
    });
    this.$el.html(renderedContent);

    var likeNewView = new Soundclown.Views.LikesNew({
      model: this.model
    });

    return this;
  }



});
