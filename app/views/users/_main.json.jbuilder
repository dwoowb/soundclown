json.partial! "tracks/index.json",
poster: user, tracks: user.tracks(),
playlists: user.playlists(),
reblogged_items: user.reblogs()

# these "tracks" should be a users' reblogged/uploaded items


