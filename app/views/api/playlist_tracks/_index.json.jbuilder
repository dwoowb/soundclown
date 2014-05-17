json.array!(playlistTracks) do |playlistTrack|
  json.partial! "api/playlist_tracks/show.json", playlistTrack: playlistTrack
end