Soundclown.Models.Track = Backbone.Model.extend({
  urlRoot: "/api/tracks",

  parse: function(jsonResp) {
    var that = this;
    this.comments().set(jsonResp.comments);
    this.comments().each(function(comment) {
      comment.set("track", that);
    });
    delete jsonResp.comments
  },

  comments: function() {
    if (!this.get("comments")) {
      var comments = new Soundclown.Collections.Comments([], {});
      this.set({
        comments: comments
      });
    }

    return this.get("comments")
  }

});
