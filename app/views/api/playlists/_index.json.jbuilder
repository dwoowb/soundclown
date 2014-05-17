json.array!(playlists) do |playlist|
  json.partial! "api/playlists/show.json",
  playlist: playlist, likes: playlist.likes,
  reblogs: playlist.reblogs,
  playlistTracks: playlist.playlist_tracks,
  tracks: playlist.tracks
end