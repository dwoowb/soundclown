Soundclown.Models.Track = Backbone.Model.extend({
  urlRoot: "/api/tracks",

  parse: function(jsonResp) {
    var that = this;
    if (jsonResp.comments) {
      this.comments().set(jsonResp.comments);
      this.comments().each(function(comment) {
        comment.set("track", that);
      });
      delete jsonResp.comments;
    };

    return jsonResp;
  },

  comments: function() {
    if (!this.get("comments")) {
      var trackComments = new Soundclown.Collections.Comments([], {});
      this.set({
        comments: trackComments
      });
    };

    return this.get("comments");
  }

});
