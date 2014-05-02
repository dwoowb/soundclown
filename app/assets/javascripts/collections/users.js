Soundclown.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: Soundclown.Models.User,


});

// window.Soundclown.Collections.users = new Soundclown.Collections.Users();