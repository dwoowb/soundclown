Soundclown.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST["users/profile"],
  className: "user-profile",

  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);
    var followersStat = new Soundclown.Views.FollowersStat({
      user: this.model
    });
    this.addSubview(".followers-stat", followersStat);
    var tracksStat = new Soundclown.Views.TracksStat({
      user: this.model
    });
    this.addSubview(".tracks-stat", tracksStat);
    // var userEdit = new Soundclown.Views.UserEdit({
    //   model: this.model
    // });
    // this.addSubview(".user-edit", userEdit);

    // var newFollow = new Soundclown.Views.FollowsNew({
    //   user: this.model
    // });
    // this.addSubview(".user-follow", newFollow);
  },

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      user: this.model
    });

    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  }
})