Soundclown.Views.ReblogsNew = Backbone.View.extend({
  template: JST["reblogs/new"],
  className: "reblog-new",

  events: {
    "submit form.reblog": "reblog",
    "submit form.unreblog": "unreblog"
  },

  initialize: function(options) {
    this.rebloggedItem = options.rebloggedItem,
    this.rebloggableType = options.rebloggableType
  },


  reblog: function(event) {
    event.preventDefault();
    var that = this;
    var $submit = $(event.currentTarget)
    var $scope = $submit.closest("div");
    var params = $submit.serializeJSON()["reblog"];
    var reblog = new Soundclown.Models.Reblog(params);
    reblog.save({}, {
      success: function() {
        Soundclown.reblogs.add(reblog);
        Soundclown.currentUser.reblogs().add(reblog);
        debugger
        if (that.rebloggableType === "Track") {
          Soundclown.currentUser.rebloggedTracks().add(that.rebloggedItem);
        } else {
          Soundclown.currentUser.rebloggedPlaylists().add(that.rebloggedItem);
        };
        debugger
        $scope.addClass("been-reblogged");
      }
    });
    this.rebloggedItem.reblogs().add(reblog);
  },

  unreblog: function(event) {
    event.preventDefault();
    var $submit = $(event.currentTarget)
    var $scope = $submit.closest("div");
    var params = $submit.serializeJSON()["reblog"];
    var reblog = Soundclown.currentUser
                           .reblogs()
                           .findWhere({ rebloggable_id: parseInt(params["rebloggable_id"]) });
    this.rebloggedItem.reblogs().remove(reblog);
    if (this.rebloggableType === "Track") {
      Soundclown.currentUser.rebloggedTracks().remove(this.rebloggedItem);
    } else {
      Soundclown.currentUser.rebloggedPlaylists().remove(this.rebloggedItem);
    };
    reblog.destroy({
      success: function() {
        $scope.removeClass("been-reblogged");
      }
    });
  },

  render: function() {
    var renderedContent = this.template({
      user: Soundclown.currentUser,
      rebloggedItem: this.rebloggedItem,
      rebloggableType: this.rebloggableType
    });

    this.$el.html(renderedContent);
    return this;
  }
})