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
    var $submit = $(event.currentTarget)
    var $scope = $submit.closest("div");
    var params = $submit.serializeJSON()["reblog"];
    var reblog = new Soundclown.Models.Reblog(params);
    reblog.save({}, {
      success: function() {
        Soundclown.reblogs.add(reblog);
        Soundclown.currentUser.reblogs().add(reblog);
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