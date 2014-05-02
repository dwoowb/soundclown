window.Soundclown = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    var data = JSON.parse($("#bootstrapped-json").html());
    console.log(data)

    Soundclown.currentUser = new Soundclown.Models.User(data["currentUser"]);
    Soundclown.users = new Soundclown.Collections.Users(Soundclown.currentUser)

    new Soundclown.Routers.Users({
      $leftbar: $("#leftbar"),
      $rootEl: $("#content"),
      $rightbar: $("#rightbar")
    })

    Backbone.history.start();

  }
};