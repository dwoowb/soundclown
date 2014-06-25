# SoundClone is a SoundCloud clone #


That phrase was a mouthful.
 
[SoundClone](http://dwoowb.com/soundclone) is a clone of a personal favorite web application of [mine](http://dwoowb.com), [SoundCloud](http://soundcloud.com).

This project was initially going to be a SoundCloud clone, featuring only clown sounds, hence the repository name. Intended as a two-fold endeavor, to recreate basic functionality of the site while overcoming my fear of clowns. The latter proved to be too difficult to accomplish this time around, but is an ongoing commitment. 

# Features #


* Plays music while navigating the site
* Like and reblog tracks and playlists
* Comment on tracks
* User has index pages of reblogged items, liked items, commented tracks, followers, followees, playlists, and tracks
* View other users' profile pages
* Have a stream of followees' reblogged items

# Technologies Used #


* RESTful Rails 4 API for the backend
* Backbone.js frontend for a snappier, more native app experience
* Custom styled CSS, in conjunction with [Font Awesome's](http://fortawesome.github.io/Font-Awesome/) icons, and [SoundManager 2's](http://www.schillmania.com/projects/soundmanager2/) player.

# Todo's #


Bugs to work out:

* Adding and removing tracks to playlists
* Track show when navigating from comments


Additional features that would be cool:

* Universal player in the navigation bar
	* to control currently playing track from anywhere on the site
* SendGrid to authenticate and activate signing up, via email
* Search for tracks and users
* Player that displays waveform visualization
* jQuery UI draggable functionality for reordering a playlist
* File uploader to work with Backbone.js