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

  render: function() {
    var renderedContent = this.template({
      user: Soundclown.currentUser,
      rebloggedItem: this.rebloggedItem,
      rebloggableType: this.rebloggableType
    });

    this.$el.html(renderedContent);
    return this;
  },

  reblog: function(event) {
    event.preventDefault();

    var $submit = $(event.currentTarget)
    var $scope = $submit.closest("form");
    var params = $submit.serializeJSON()["reblog"];
    var reblog = new Soundclown.Models.Reblog(params);
    reblog.save({}, {
      success: function() {
        Soundclown.reblogs.add(reblog);
        Soundclown.currentUser.reblogs().add(reblog);
        $(".reblog-form").addClass("been-reblogged");
      }
    });
  },

  unreblog: function(event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON()["reblog"];
    var unreblog = Soundclown.currentUser
                           .reblogs()
                           .findWhere({ rebloggable_id: parseInt(params["rebloggable_id"]) });
    unreblog.destroy({
      success: function() {
        $(".reblog-form").removeClass("been-reblogged");
      }
    });

  }

})