Soundclown.Models.Comment = Backbone.Model.extend({
  urlRoot: "api/comments",
  //
  // parse: function(jsonResp) {
  //   if (jsonResp.track) {
  //     this.track().set(jsonResp.track);
  //     delete jsonResp.track;
  //   };
  // },
  //
  // track: function() {
  //   if (!this.get("track")) {
  //     var commentTrack = new Soundclown.Models.Track([], {});
  //     this.set({
  //       track: commentTrack
  //     });
  //   };
  //   return this.get("track");
  // }

});
