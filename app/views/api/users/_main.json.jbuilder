json.partial! "api/tracks/index.json",
poster: user, tracks: user.tracks


json.partial! "api/playlists/index.json",
creator: user, playlists: user.playlists



# these "tracks" should be a users' reblogged/uploaded items


