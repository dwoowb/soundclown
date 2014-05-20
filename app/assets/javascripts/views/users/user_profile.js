Soundclown.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST["users/profile"],
  className: "user-profile",

  events: {
    "click .edit-link": "openModal",
    "click .modal-x": "closeModal",
    "submit form.sign-up": "closeModal"
  },

  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.followers(), "add change remove", this.changeFollowersStat);
    this.listenTo(this.model.tracks(), "add change remove", this.changeTracksStat);
    var userFollowersStat = new Soundclown.Views.UserFollowersStat({
      followee: this.model
    });
    this.addSubview(".followers-stat", userFollowersStat);
    var userTracksStat = new Soundclown.Views.UserTracksStat({
      user: this.model
    });
    this.addSubview(".tracks-stat", userTracksStat);
    var newFollow = new Soundclown.Views.FollowsNew({
      user: this.model
    });
    this.addSubview(".user-follow", newFollow);
    var userEdit = new Soundclown.Views.UserEdit({
      user: this.model
    });
    this.addSubview(".user-edit-container", userEdit)
  },

  changeFollowersStat: function() {
		var followee = this.model;
    var newFollowersStat = new Soundclown.Views.UserFollowersStat({
      followee: followee
    });
    var oldFollowersStat = _(this.subviews()[".followers-stat"]).find(function(subview) {
      return subview.followee == followee;
    });
    this.removeSubview(".followers-stat", oldFollowersStat);
    this.addSubview(".followers-stat", newFollowersStat);
    newFollowersStat.render();
  },

  changeTracksStat: function() {
		var user = this.model;
    var newTracksStat = new Soundclown.Views.UserTracksStat({
      user: user
    });
    var oldTracksStat = _(this.subviews()[".tracks-stat"]).find(function(subview) {
      return subview.user == user;
    });
    this.removeSubview(".tracks-stat", oldTracksStat);
    this.addSubview(".tracks-stat", newTracksStat);
    newTracksStat.render();
  },

  openModal: function(event) {
    event.preventDefault();
    $("#edit-modal").addClass("is-active");
  },

  closeModal: function(event) {
    event.preventDefault();
    $("#edit-modal").removeClass("is-active");
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