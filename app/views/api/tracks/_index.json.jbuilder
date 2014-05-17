json.array!(tracks) do |track|
  json.partial! "api/tracks/show.json",
  track: track, comments: track.comments,
  likes: track.likes, reblogs: track.reblogs,
  playlistTracks: track.playlist_tracks
end


