Soundclown.Collections.UserTracks = Backbone.Collection.extend({
  model: Soundclown.Models.Track,

  initialize: function (models, options) {
    this.user = options.user;
  },

  url: function() {
    //  "/api/users/" + this.user.get("id") the url method uses rootURL and appends the id
    return this.user.url() + "/tracks";
  }
})