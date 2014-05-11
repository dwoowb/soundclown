Soundclown.Views.TrackShow = Backbone.View.extend({
  template: JST['tracks/show'],

  initialize: function(options) {
    this.listenTo(this.model.comments(), "add", this.addComment);
    this.listenTo(this.model.comments(), "remove", this.removeComment);
  },

  events: {

  },

  render: function() {

    var renderedContent = this.template({
      track: this.model
    });
    this.$el.html(renderedContent);

    // i don't like rebuilding a new view on every render
    var commentNew = new Soundclown.Views.CommentsNew();
    this.$(".comment-new").html(commentNew.render().$el);

    return this;
  }



});
