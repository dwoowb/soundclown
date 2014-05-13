Soundclown.Collections.Comments = Backbone.Collection.extend({
  url: "api/comments",
  model: Soundclown.Models.Comment,

  comparator: function(comment) {
    return -comment.get("id");
  },

});
